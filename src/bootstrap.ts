import express from 'express';

export const app = express().use(express.json());

app.get('/', (req, res) => res.send('dependency-injection'));
