import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({ usuarios });

}

export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        res.status(404).json({
            msg: `No existe un usuario con id ${id}`
        })
    }

    res.json({ usuario });
}

export const postUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            res.status(400).json({
                msg: `Ya existe un usuario con email ${body.email}`
            });
        }

        const usuario = new Usuario(body);
        await usuario.save();
        res.json(usuario);

    } catch (error) {

        console.log(error);

        res.json({
            msg: 'Hable con el administrador.'
        });
    }

}

export const putUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }

        await usuario.update(body);

        res.json({ usuario });

    } catch (error) {
        res.json({
            msg: 'Put usuario.',
            body,
            id
        });
    }

}

export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }

        // await usuario.destroy();
        await usuario.update({ estado: false });

        res.json({ usuario });

    } catch (error) {
        console.log(error);

        res.json({
            msg: 'Hable con el administrador.',
        });
    }


}







