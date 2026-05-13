const internalDocumentController = {
  sendEmail: async (req, res) => {
    const { documentType, reference, email } = req.body;

    if (!documentType || !reference || !email) {
      return res.status(400).json({ message: 'Tipo de documento, referencia y correo son obligatorios' });
    }

    res.json({
      message: 'Solicitud de envio registrada. Configurar proveedor SMTP para entrega real.',
      result: { documentType, reference, email, status: 'queued-local' }
    });
  }
};

module.exports = { internalDocumentController };
