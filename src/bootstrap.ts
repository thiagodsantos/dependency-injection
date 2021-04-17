import express from 'express';
import corsinit from 'cors';

const cors = corsinit({ origin: '*' });

export const app = express().use(cors).use(express.json());
export const router = express.Router();