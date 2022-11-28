import * as Yup from 'yup';


export const CheckOutSchema = {
    Ticket: '',
    Time: '',
};

export const IncidentSchema = {
    latitud: '',
    longitud: '',
    incidenteTipoId: '',
    evidencias: '',
    comentarioGuardia: '',
    images: [],
};

export const AuthSchema = Yup.object().shape({
    email: Yup
        .string()
        .email('El email es incorrecto')
        .required('El email es requerido'),
    password: Yup
        .string()
        .min(4, 'La contraseña debe ser de almenos 5 caracteres.')
        .max(20, 'La contraseña no debe exceder 12 caracteres.')
        .required('La contraseña es requerida.'),
});