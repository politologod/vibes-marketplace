import { type Request, type Response } from 'express';
import Product from '../models/Product.models.js';
import { type AuthRequest } from '../middleware/auth.middleware.js';

export const crearProducto = async (req: AuthRequest, res: Response) => {
  try {
    const productoData = {
      ...req.body,
      vendedorId: req.user._id,
      imagenes: []
    };
    
    const producto = new Product(productoData);
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

export const actualizarProducto = async (req: AuthRequest, res: Response) => {
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

export const eliminarProducto = async (req: AuthRequest, res: Response) => {
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

export const obtenerProductosSimple = async (req: Request, res: Response) => {
  try {
    const { 
      search = '',
      sort = 'price',
      order = 'asc',
      page = 1, 
      limit = 10,
      available
    } = req.query;

    const filtros: any = { estado: 'activo' };

    if (available !== undefined) {
      if (available === 'true') {
        filtros.stock = { $gt: 0 };
      } else if (available === 'false') {
        filtros.stock = { $lte: 0 };
      }
    }

    if (search && search.toString().trim() !== '') {
      filtros.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { descripcion: { $regex: search, $options: 'i' } },
        { categoria: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions: any = {};
    if (sort === 'price') {
      sortOptions.precio = order === 'desc' ? -1 : 1;
    } else if (sort === 'name') {
      sortOptions.nombre = order === 'desc' ? -1 : 1;
    }

    const pageNum = parseInt(page.toString()) || 1;
    const limitNum = parseInt(limit.toString()) || 10;
    const skip = (pageNum - 1) * limitNum;

    filtros.imagenes = { $exists: true, $ne: [], $not: { $size: 0 } };

    const productos = await Product
      .find(filtros)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    const productosSimples = productos
      .filter(producto => {
        return producto.imagenes && 
               producto.imagenes.length > 0 && 
               producto.imagenes[0]?.includes('cloudinary.com');
      })
      .map(producto => ({
        id: producto._id?.toString(),
        name: producto.nombre,
        price: producto.precio,
        isAvailable: producto.stock > 0,
        category: producto.categoria,
        image: producto.imagenes[0] 
      }));

    res.json(productosSimples);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const obtenerProductoSimplePorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await Product.findById(id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    if (!producto.imagenes || 
        producto.imagenes.length === 0 || 
        !producto.imagenes[0]?.includes('cloudinary.com')) {
      return res.status(404).json({
        success: false,
        message: 'Producto sin imágenes válidas disponibles'
      });
    }

    const productoSimple = {
      id: producto._id?.toString(),
      name: producto.nombre,
      price: producto.precio,
      isAvailable: producto.stock > 0,
      category: producto.categoria,
      image: producto.imagenes[0],
      description: producto.descripcion,
      stock: producto.stock
    };

    res.json(productoSimple);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el producto',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const subirImagenProducto = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const cloudinaryUrl = (req as any).cloudinaryUrl;

    if (!cloudinaryUrl) {
      return res.status(400).json({
        success: false,
        message: 'No se recibió ninguna imagen'
      });
    }

    const producto = await Product.findById(id);
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    if (!producto.imagenes) {
      producto.imagenes = [];
    }
    producto.imagenes.push(cloudinaryUrl);

    await producto.save();

    res.json({
      success: true,
      data: {
        imageUrl: cloudinaryUrl,
        producto: producto
      },
      message: 'Imagen subida exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al subir imagen',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const subirMultiplesImagenes = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const cloudinaryUrls = (req as any).cloudinaryUrls;

    if (!cloudinaryUrls || cloudinaryUrls.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se recibieron imágenes'
      });
    }

    const producto = await Product.findById(id);
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    if (!producto.imagenes) {
      producto.imagenes = [];
    }
    producto.imagenes.push(...cloudinaryUrls);

    await producto.save();

    res.json({
      success: true,
      data: {
        imageUrls: cloudinaryUrls,
        producto: producto
      },
      message: `${cloudinaryUrls.length} imágenes subidas exitosamente`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al subir imágenes',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};
