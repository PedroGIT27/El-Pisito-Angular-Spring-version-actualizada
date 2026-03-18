import { Inmobiliaria, Operacion, Poblacion, Tipo } from "./entities";

export interface Credenciales { //JWTRequest en servidor

    username:string;
    password:string;
}

export interface CredencialesRespuesta{ //JWTResponse en servidor

    mensaje:any;

}

export interface BannerCarouselIdDTO{

    id:number;
}

export interface BannerCarouselImagenDTO{

    id:number;
    titular:string;
    claim:string;
    activo:number;
    imagenes:Array<ImagenDTO>;  //ImagenDTO[]
}


export interface BannerIdDTO{

    id:number;

}

export interface BannerImagenDTO{

    id:number;
    titular:string;
    claim:string;
    link:string;
    activo:number;
    imagenes:Array<ImagenDTO>; 

}

export interface ErrorResponseDTO{

    timeStamp:Date;
    status:number;
    error:string;
    mensaje:string;
    path:string;
    message:string;

}

export interface ImagenDTO{

    id:number;
    url:string;
    altImagen:string;
    entidadId:number;

}

export interface InmobiliariaIdDTO{

    id:number;
}


export interface InmobiliariaImagenDTO{

    id:number;
    nombre:string;
    telefono:string;
    representante:string;
    activo:number;
    imagenes:Array<ImagenDTO>; 


}


export interface InmuebleIdDTO{

    id:number;
}

export interface InmuebleImagenDTO{


        id:number;
        via:string;
        claim:string;
        nombreVia:string;
        numero:string;
        planta:string;
        puerta:string;
        apertura:string;
        orientacion:string;
        superficieUtil:number;
        superficieConstruida:number;
        precio:number;
        habitaciones:number;
        banhos:number;
        descripcion:string;
        calefaccion:string;
        amueblado:number;
        balcones:number;
        garajes:number;
        piscina:number;
        trastero:number;
        ascensor:number;
        jardin:number;
        tendedero:number;
        portada:number;
        oportunidad:number;
        tipo:Tipo;
        operacion:Operacion;
        poblacion:Poblacion;
        inmobiliaria:InmobiliariaImagenDTO;
        activo:number;
        imagenes:Array<ImagenDTO>;
        

}


export interface UsuarioDTO{

    id:number;
    nombre:string;
    rol:string;
    activo:number;

}