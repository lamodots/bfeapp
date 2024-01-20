import { ContactModel } from "../models/contactModel.js";

export const CreateContactService = async (body) => {
  const contact = await ContactModel.create(body);
  return contact;
};

export const getAllContactsService = async () => {
  const contacts = await ContactModel.find({});
  return contacts;
};

export const getContactByIdService = async (id) => {
  return await ContactModel.findById(id);
};

export const updateContactService = async (id, body) => {
  return await ContactModel.findByIdAndUpdate(id, body, { new: true });
};

export const deleteContactServices = async (id) => {
  return await ContactModel.findByIdAndDelete(id);
};

export const phoneNoExistsServices = async (phoneNo) => {
  const phoneNoExist = await ContactModel.findOne({ phoneNo });

  if (phoneNoExist) {
    return true;
  }
  return false;
};
