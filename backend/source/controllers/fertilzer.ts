import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import Fertlizer from '../models/fertilizer';
import { UploadedFile } from 'express-fileupload';


const NAMESPACE = 'Fertlizer';

const createFertlizer = async (req: Request, res: Response, next: NextFunction) => {
    let {
        price,
        status,
        name,
        image_path,
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

    const _Fertlizer = new Fertlizer({
        _id: new mongoose.Types.ObjectId(),
        price,
        status,
        name,
        image_path
    });

    return _Fertlizer
        .save()
        .then((Fertlizer) => {
            return res.status(201).json({
                Fertlizer
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}



const getAllFertlizers = (req: Request, res: Response, next: NextFunction) => {
    Fertlizer.find()
        .exec()
        .then((Fertlizers) => {
            return res.status(200).json({
                Fertlizers: Fertlizers,
                count: Fertlizers.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getFertlizerById = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Fertlizer.findById(id).then((Fertlizer) => {
        if (Fertlizer) {
            return res.status(200).json({ Fertlizer })
        } else {
            return res.status(404).json({ "message": "Fertlizer not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})


const updateFertlizer = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Fertlizer.findById(id).then((Fertlizer) => {
        if (Fertlizer) {
            return Fertlizer.set(req.body).save().then((Fertlizer) => {
                return res.status(201).json({ Fertlizer })
            }).catch(err => {
                return res.status(500).json({ error: err })
            })
        } else {
            return res.status(404).json({ "message": "Fertlizer not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})

export default { createFertlizer, getAllFertlizers, getFertlizerById, updateFertlizer };
