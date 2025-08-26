const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Note= require("../models/Note");
router.get("/fetchusernotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);   // ✅ return plain array, not [notes]
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error" });
  }
});
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("desc", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, desc, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,desc,tag,user:req.user.id
      });
      const savedNote=await note.save();
      res.json({note:savedNote});

    } catch (error) {
      console.error(err.message);
      res.status(500).send({ error: "Internal server error" });
    }
  }
);
//Updating a note
router.put("/updateNote/:id",fetchuser,async (req,res)=>
{
  try{
  const {title,desc,tag}=req.body;
  //Creating a new note
  const newNote={};
  if(title){newNote.title=title};
  if(desc){newNote.desc=desc};
  if(tag){newNote.tag=tag};
  let note= await Note.findById(req.params.id);
  if(!note)
  {
    return res.status(404).send("Not found!");
  }
  if(note.user.toString()!=req.user.id)
  {
    return res.status(401).send("Unauthorized Access!");
  }
  note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
  res.json({note});
}
catch(error)
{
  console.error(err.message);
   res.status(500).send({ error: "Internal server error" });
}
});
//Router to delete a note 
router.delete("/deleteNote/:id",fetchuser,async(req,res)=>
{
  try
  {
  let note= await Note.findById(req.params.id);
  //Finding note to be deleted and to delete
  if(!note)
  {
    return res.status(404).send("Not found!");
  }
  //Allowing deletion only if it's user's notes
  if(note.user.toString()!=req.user.id)
  {
    return res.status(401).send("Unauthorized Access!");
  }
  note =await Note.findByIdAndDelete(req.params.id);
  res.json({"Success":"Note has been deleted","note":note});
}
catch(error)
{
  console.error(err.message);
  res.status(500).send({ error: "Internal server error" });
}
});
module.exports = router;
