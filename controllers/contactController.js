import {
  CreateContactService,
  deleteContactServices,
  getAllContactsService,
  getContactByIdService,
  updateContactService,
} from "../services/contactService.js";
export const createContactController = async (req, res) => {
  try {
    if (
      !req.body.firstname ||
      !req.body.middlename ||
      !req.body.surname ||
      !req.body.company ||
      !req.body.phoneNo
    ) {
      return res.status(400).json({ message: "All fields requires" });
    }

    const newContact = {
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      surname: req.body.surname,
      company: req.body.company,
      phoneNo: req.body.phoneNo,
    };
    const newContactInfo = await CreateContactService(newContact);
    return res
      .status(201)
      .send({ message: "Contact added successfully", newContactInfo });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getContactController = async (req, res) => {
  try {
    const contacts = await getAllContactsService();
    return res
      .status(200)
      .json({ message: "Contacts retrived successfully!", data: contacts });
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactByIdController = async (req, res) => {
  try {
    const contact = await getContactByIdService(req.params.id);
    return res
      .status(200)
      .json({ message: "Contact retrived sucessfully!", data: contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const upDateContactByIdController = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(404)
        .json({ message: "Please supply account ID as params!" });
    }
    if (
      !req.body.firstname ||
      !req.body.middlename ||
      !req.body.surname ||
      !req.body.company ||
      !req.body.phoneNo
    ) {
      return res.status(404).json({ message: "Send all required fields" });
    }

    const findContact = await getContactByIdService(req.params.id);
    if (!findContact) {
      return res
        .status(404)
        .json({ message: "Contact with such ID to not exists" });
    }

    const updatedContact = await updateContactService(req.params.id, req.body);
    return res
      .status(200)
      .json({ message: "Contact updated sucessfully!", data: updatedContact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContactController = async (req, res) => {
  try {
    const result = await deleteContactServices(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
