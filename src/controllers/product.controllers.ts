import { type Request, type Response } from 'express';
import Product from '../models/Product.models.js';

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const producto = new Product(req.body);
    await producto.save();
    res.status(201).json({
      success: true,
      data: producto,
      message: 'Producto creado exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el producto',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const obtenerProductos = async (req: Request, res: Response) => {
  try {
    const { 
      search = '',
      sort = 'fechaCreacion',
      order = 'desc',
      page = 1, 
      limit = 10,
      available
    } = req.query;

    const filtros: any = {};

    if (available !== undefined) {
      if (available === 'true') {
        filtros.estado = 'activo';
        filtros.stock = { $gt: 0 };
      } else if (available === 'false') {
        filtros.$or = [
          { estado: { $ne: 'activo' } },
          { stock: { $lte: 0 } }
        ];
      }
    } else {
      filtros.estado = 'activo';
    }

    if (search && search.toString().trim() !== '') {
      filtros.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { descripcion: { $regex: search, $options: 'i' } },
        { categoria: { $regex: search, $options: 'i' } },
        { etiquetas: { $in: [new RegExp(search.toString(), 'i')] } }
      ];
    }

    const sortField = sort === 'price' ? 'precio' : sort === 'name' ? 'nombre' : 'fechaCreacion';
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj: any = {};
    sortObj[sortField] = sortOrder;

    const skip = (Number(page) - 1) * Number(limit);
    
    const productos = await Product
      .find(filtros)
      .populate('vendedorId', 'nombreCompleto correo')
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filtros);

    res.json({
      success: true,
      data: productos,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalProducts: total,
        hasNextPage: skip + Number(limit) < total,
        hasPrevPage: Number(page) > 1
      },
      filters: {
        search: search.toString(),
        sort: sortField,
        order: order.toString(),
        available: available?.toString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los productos',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const obtenerProductoPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await Product
      .findById(id)
      .populate('vendedorId', 'nombreCompleto correo numeroTelefono');

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      data: producto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el producto',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const actualizarProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await Product.findByIdAndUpdate(
      id,
      { ...req.body, fechaActualizacion: new Date() },
      { new: true, runValidators: true }
    );

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      data: producto,
      message: 'Producto actualizado exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el producto',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await Product.findByIdAndDelete(id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el producto',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const buscarProductos = async (req: Request, res: Response) => {
  try {
    const { q, categoria, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Parámetro de búsqueda requerido'
      });
    }

    const filtros: any = {
      estado: 'activo',
      $text: { $search: q as string }
    };

    if (categoria) filtros.categoria = categoria;

    const productos = await Product
      .find(filtros, { score: { $meta: 'textScore' } })
      .populate('vendedorId', 'nombreCompleto')
      .sort({ score: { $meta: 'textScore' } })
      .limit(Number(limit));

    res.json({
      success: true,
      data: productos,
      totalResults: productos.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en la búsqueda',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const obtenerCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await Product.distinct('categoria', { estado: 'activo' });
    res.json({
      success: true,
      data: categorias
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener categorías',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};
