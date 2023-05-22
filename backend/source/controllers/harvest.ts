import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import Harvest from '../models/harvest';
import { UploadedFile } from 'express-fileupload';


const NAMESPACE = 'Harvest';

const createHarvest = async (req: Request, res: Response, next: NextFunction) => {
    let {
        unit_price,
        status,
        name,
        measurement_unit
    } = req.body;


    const ProductName = `${name}-${new Date().getTime()}`;
    // Access the uploaded file using req.files.file
    // const file = req.files.file as UploadedFile;

    // // Process the uploaded file
    // // Example: Save the file to disk
    // file.mv(`uploads/${file.name}`, (err) => {
    //     if (err) {
    //         return res.status(500).send(err);
    //     }

    //     res.send('File uploaded successfully!');
    // });

    const _Harvest = new Harvest({
        _id: new mongoose.Types.ObjectId(),
        unit_price,
        status,
        name,
        measurement_unit,
        image_path : ProductName
    });

    return _Harvest
        .save()
        .then((Harvest) => {
            return res.status(201).json({
                Harvest
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}



const getAllHarvests = (req: Request, res: Response, next: NextFunction) => {
    Harvest.find()
        .exec()
        .then((Harvests) => {
            return res.status(200).json({
                Harvests: Harvests,
                count: Harvests.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getHarvestById = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Harvest.findById(id).then((Harvest) => {
        if (Harvest) {
            return res.status(200).json({ Harvest })
        } else {
            return res.status(404).json({ "message": "Harvest not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})


const updateHarvest = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Harvest.findById(id).then((Harvest) => {
        if (Harvest) {
            return Harvest.set(req.body).save().then((Harvest) => {
                return res.status(201).json({ Harvest })
            }).catch(err => {
                return res.status(500).json({ error: err })
            })
        } else {
            return res.status(404).json({ "message": "Harvest not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})

export default { createHarvest, getAllHarvests, getHarvestById, updateHarvest };
