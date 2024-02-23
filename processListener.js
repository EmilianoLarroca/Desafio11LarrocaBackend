//Nos ejecuta una vez terminado el proceso
process.on('exit', code => {
    console.log('Evento que se ejecuta antes salir del proceso:', code)
})

//Nos ejecuta errores o excepciones, donde nos remarca errores en el codigo
process.on('uncaughtException', exception => {
    console.log('Captura todos los errores:', exception)
})

console.log('ejecutando alguna setencia')

