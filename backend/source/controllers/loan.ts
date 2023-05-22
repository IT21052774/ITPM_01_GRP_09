import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import Loan from '../models/loan';



const NAMESPACE = 'Loan';

const createLoan = async (req: Request, res: Response, next: NextFunction) => {
    let {
        requested_by,
        reason,
        special_notice,
        status,
        amount
    } = req.body;


    res.send('File uploaded successfully!');
    // });

    const _Loan = new Loan({
        _id: new mongoose.Types.ObjectId(),
        requested_by,
        reason,
        special_notice,
        status,
        amount
    });

    return _Loan
        .save()
        .then((Loan) => {
            return res.status(201).json({
                Loan
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}



const getAllLoans = (req: Request, res: Response, next: NextFunction) => {
    Loan.find()
        .exec()
        .then((Loans) => {
            return res.status(200).json({
                Loans: Loans,
                count: Loans.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getLoanById = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Loan.findById(id).then((Loan) => {
        if (Loan) {
            return res.status(200).json({ Loan })
        } else {
            return res.status(404).json({ "message": "Loan not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})


const updateLoan = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Loan.findById(id).then((Loan) => {
        if (Loan) {
            return Loan.set(req.body).save().then((Loan) => {
                return res.status(201).json({ Loan })
            }).catch(err => {
                return res.status(500).json({ error: err })
            })
        } else {
            return res.status(404).json({ "message": "Loan not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})

export default { createLoan, getAllLoans, getLoanById, updateLoan };
