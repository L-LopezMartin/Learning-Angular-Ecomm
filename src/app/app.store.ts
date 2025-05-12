import { inject } from "@angular/core"
import { NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router"
import { patchState, signalStore, withHooks, withMethods, withState} from "@ngrx/signals"
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { pipe, tap } from "rxjs"

type AppState = {
    loading: boolean
    failed: boolean
}

const initialState: AppState = {
    loading: false,
    failed: false
}

/*      Manejo del estado de la store

    Actualmente solo sirve para saber cuándo está cargando (buscando productos en FakeStoreAPI) o hubo un problema en el fetch
    Esto se usa para que se muestre una barra de carga en la pantalla principal

    El código comentado de más abajo era para que cada página tuviera su barra de carga, pero
        1- Realmente no es necesario porque el cart se carga al instante
        2- No logré hacerlo andar
    Creo que hacía que la barra se mostrara si la ruta en sí estaba cargada ("/" o "/cart"), lo que hacía que no se mostrara la barra que hice para el fetch (se sobreescribía)

*/
export const AppStore = signalStore(
    { providedIn: "root"},
    withState(initialState),
    withMethods( (
        store,
    ) => ({
        startLoading: () =>{
            patchState(store, { loading:true })
        },
        stopLoading:() =>{
            patchState(store, { loading:false })
        },

        fail:() => {
            patchState(store, { loading: false, failed:true})
        },

        // Lo siguiente serviría para mostrar la progress bar si mi página cargara cuando cargue todo lo de la ruta.
        // Como no es mi caso, lo voy a comentar todo porque está haciendo que no se muestre la progress bar
        // loaderOnNavigation: rxMethod<any>(pipe(
        //     tap((event)=>{
        //         if (event instanceof NavigationStart){
        //             patchState(store, {loading: true})
        //         } else if (event instanceof NavigationEnd || event instanceof NavigationError){
        //             patchState(store, {loading: false})
        //         }
        //     })
        // ))
    })),
    //Los hooks que tengo acompañan al "loaderOnNavigation". También lo voy a comentar porque no me sirve
    // withHooks((store, router = inject(Router)) => ({
    //     onInit(){
    //         store.loaderOnNavigation(router.events)
    //     }
    // }))
)