import express from 'express';
import corsinit from 'cors';

const cors = corsinit({ origin: '*' });

export const app = express().use(cors);
export const router = express.Router();