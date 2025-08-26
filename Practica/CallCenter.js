export default class CallCenter{  
    constructor(id_operador,nombre_operador,estrellas,id_cliente,nombre_cliente){
        this.id_operador = id_operador;
        this.nombre_operador = nombre_operador;
        this.estrellas = estrellas;
        this.id_cliente = id_cliente;
        this.nombre_cliente = nombre_cliente;

        this.estrellas = this.contarEstrellas();
        this.rendimiento = this.clasificarOperador();

    }
    contarEstrellas() {
    return this.estrellas.split(";").filter(e => e.toLowerCase() === "x").length;
    }

    clasificarOperador() {
        if (this.estrellas >= 5) return "Buenisimo";
        if (this.estrellas >= 3) return "Regular";
        if (this.estrellas >= 1) return "Malo";
        return "nadota";
    }

}
