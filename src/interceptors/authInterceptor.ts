import { HttpHandlerFn, HttpRequest } from "@angular/common/http"

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

    if (typeof window === 'undefined') {

        return next(req)

    }

    const token = localStorage.getItem('authToken')

    if (token) {

        const cloned = req.clone({

            headers: req.headers.append('Authorization', `Bearer ${token}`)

        });

        return next(cloned)
    }

    return next(req)

}