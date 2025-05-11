import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import UserModels from './Models/UserModels.js'
import SeedlingModel from './Models/SeedlingModel.js'
import LocalSeedlingModel from './Models/LocaloSeedlingModel.js'
import dotenv from "dotenv";

const app = express()
app.use(express.json());
app.use(cors());

//___________________________(USER REGISTRATION)_________________________________
app.post('/registerUser', async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;
        const user = new UserModels({
            fname, lname, email, password
        })
        await user.save()
        res.status(201).json({
            user: {
                fname: user.fname,
                lname: user.lname,
                email: user.email
            },
            msg: "User registered successfully"
        });
    } catch (error) {
        res.status(500).json({ msg: "An error occurred during registration" });
    }
})

//______________________USER LOGIN__________________________
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModels.findOne({ email: email })
        if (!user) {
            return res.status(401).json({ msg: "User not found" })
        }
        if (user.password !== password) {
            return res.status(401).json({ msg: "Password is incorrect" })
        }
        res.status(200).json({
            user: {
                fname: user.fname,
                lname: user.lname,
                email: user.email
            },
            msg: "Authentication successful"
        })
    } catch (error) {
        res.status(500).json({ msg: "An unexpected error occurred" })
    }
})

//____________________ADD IMPORTED Seedlings_______________________
app.post("/addSeedling",async(req,res)=>{
    try{
        const { name, type, quantity, price, total } = req.body;
      const seedling = new SeedlingModel({
      name,
      type,
      quantity,
      price,
      total
    })
    await seedling.save()
    res.send({seedling: seedling, msg: "Added seedling Successfully"});
 }
    catch(error){
        res.status(500).json({msg: "An error occurred"});
    }
})


//____________________GET ALL  IMPORTED SEEDLINGS_______________________
app.get("/getSeedlings", async (req, res) => {
  try {
    const seedlings = await SeedlingModel.find().sort({ createdAt: -1 });
    res.send({ seedlings, msg: "Seedlings fetched successfully" });
  } catch (error) {
    res.status(500).json({ msg: "An error occurred while fetching seedlings" });
  }
});
//____________________ADD LOCAL Seedlings_______________________
app.post("/addLocalSeedling",async(req,res)=>{
    try{
        const { name, type, quantity, price, total } = req.body;
      const localseedlings = new LocalSeedlingModel({
      name,
      type,
      quantity,
      price,
      total
    })
    await localseedlings.save()
    res.send({localseedlings: localseedlings, msg: "Added seedling Successfully"});
 }
    catch(error){
        res.status(500).json({msg: "An error occurred"});
    }
})

//____________________GET ALL  LOCAL SEEDLINGS_______________________
app.get("/getLocalSeedlings", async (req, res) => {
  try {
    const localseedlings = await LocalSeedlingModel.find().sort({ createdAt: -1 });
    res.send({localseedlings, msg: "Seedlings fetched successfully" });
  } catch (error) {
    res.status(500).json({ msg: "An error occurred while fetching seedlings" });
  }
});
//____________________UPDATE IMPORTED SEEDLING_______________________
app.put("/updateSeedling/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, type, quantity, price, total } = req.body;
  
      const updatedSeedling = await SeedlingModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name,
            type,
            quantity: Number(quantity),
            price: Number(price),
            total: Number(total),
            updatedAt: new Date()
          }
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedSeedling) {
        return res.status(404).json({ msg: "Seedling not found" });
      }
  
      res.send({ seedling: updatedSeedling, msg: "Seedling updated successfully" });
    } catch (error) {
      res.status(500).json({ msg: "An error occurred while updating seedling" });
    }
  });

//____________________GET SINGLE IMPORTED SEEDLING_______________________
app.get("/getSeedling/:id", async (req, res) => {
  try {
    const seedling = await SeedlingModel.findById(req.params.id);
    if (!seedling) {
      return res.status(404).json({ msg: "Seedling not found" });
    }
    res.send({ seedling, msg: "Seedling fetched successfully" });
  } catch (error) {
    res.status(500).json({ msg: "An error occurred while fetching seedling" });
  }
});

//____________________UPDATE Local SEEDLING_______________________
app.put("/updateLocalSeedling/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, type, quantity, price, total } = req.body;
  
      const updateLocalSeedling = await LocalSeedlingModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name,
            type,
            quantity: Number(quantity),
            price: Number(price),
            total: Number(total),
            updatedAt: new Date()
          }
        },
        { new: true } // Return the updated document
      );
  
      if (!updateLocalSeedling) {
        return res.status(404).json({ msg: "Seedling not found" });
      }
  
      res.send({ seedling: updateLocalSeedling, msg: "Seedling updated successfully" });
    } catch (error) {
      res.status(500).json({ msg: "An error occurred while updating seedling" });
    }
  });

//____________________GET SINGLE IMPORTED SEEDLING_______________________
app.get("/getLocalSeedling/:id", async (req, res) => {
  try {
    const getLocalSeedling = await LocalSeedlingModel.findById(req.params.id);
    if (!getLocalSeedling) {
      return res.status(404).json({ msg: "Seedling not found" });
    }
    res.send({ getLocalSeedling, msg: "Seedling fetched successfully" });
  } catch (error) {
    res.status(500).json({ msg: "An error occurred while fetching seedling" });
  }
});

app.post("/logout", async (req, res) => {
    res.status(200).json({ msg: "Logout successful" })
})
//Delete Imported Seedling
app.delete('/deleteseedling/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verify the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Seedling ID" });
    }

    // Find and delete the user
    const deleteImported = await SeedlingModel.findByIdAndDelete(id);
    
    if (!deleteImported) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ 
        msg: "Seedling deleted successfully",
      deleteImported: {
        _id: deleteImported._id,
        name: deleteImported.name,
        type: deleteImported.type,
        quantity: deleteImported.quantity,
        total:deleteImported.total,
        price:deleteImported.price
      }
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting user" });
  }
});
//Delete Local Seedling
app.delete('/deleteLocalseedling/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verify the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Seedling ID" });
    }

    // Find and delete the user
    const deleteLocalseedling = await LocalSeedlingModel.findByIdAndDelete(id);
    
    if (!deleteLocalseedling) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ 
        msg: "Seedling deleted successfully",
      deleteImported: {
        _id: deleteLocalseedling._id,
        name: deleteLocalseedling.name,
        type: deleteLocalseedling.type,
        quantity: deleteLocalseedling.quantity,
        total:deleteLocalseedling.total,
        price:deleteLocalseedling.price
      }
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting user" });
  }
});
//Database connection
const connectString =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@greennurser.h8e7ftp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=GreenNurser`;

mongoose.connect(connectString);

app.listen(process.env.PORT||3001, () => {
  console.log("You are connected");
});
