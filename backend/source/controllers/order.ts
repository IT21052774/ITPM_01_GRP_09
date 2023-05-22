import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import Order from '../models/order';



const NAMESPACE = 'Order';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    let {
        item_id,
        order_placed_by,
        status,
        quantity
    } = req.body;


    res.send('File uploaded successfully!');
    // });

    const _Order = new Order({
        _id: new mongoose.Types.ObjectId(),
        item_id,
        order_placed_by,
        status,
        quantity
    });

    return _Order
        .save()
        .then((Order) => {
            return res.status(201).json({
                Order
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}



const getAllOrders = (req: Request, res: Response, next: NextFunction) => {
    Order.find()
        .exec()
        .then((Orders) => {
            return res.status(200).json({
                Orders: Orders,
                count: Orders.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getOrderById = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Order.findById(id).then((Order) => {
        if (Order) {
            return res.status(200).json({ Order })
        } else {
            return res.status(404).json({ "message": "Order not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})


const updateOrder = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Order.findById(id).then((Order) => {
        if (Order) {
            return Order.set(req.body).save().then((Order) => {
                return res.status(201).json({ Order })
            }).catch(err => {
                return res.status(500).json({ error: err })
            })
        } else {
            return res.status(404).json({ "message": "Order not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})

export default { createOrder, getAllOrders, getOrderById, updateOrder };
