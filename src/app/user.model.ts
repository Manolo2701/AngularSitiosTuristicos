export interface User {
  id: string;               // Identificador único del usuario
  firstName: string;        // Nombre del usuario
  lastName: string;         // Apellido del usuario
  comunidad: string;        // Comunidad autónoma del usuario
  email: string;            // Correo electrónico
  role: 'usuario' | 'admin'; // El rol del usuario (usuario por defecto, admin cuando es administrador)
  birthday: string;         // Fecha de nacimiento (tipo string en formato 'YYYY-MM-DD')
  gender: 'masculino' | 'femenino' | 'otro'; // Género del usuario
  phone: string;            // Teléfono de contacto
  password: string;         // Contraseña cifrada (usamos un string porque está cifrada)
}
