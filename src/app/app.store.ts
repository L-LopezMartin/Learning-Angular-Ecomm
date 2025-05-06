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
        }

        //Lo siguiente serviría para mostrar la progress bar si mi página cargara cuando cargue todo lo de la ruta.
        //Como no es mi caso, lo voy a comentar todo porque está haciendo que no se muestre la progress bar
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