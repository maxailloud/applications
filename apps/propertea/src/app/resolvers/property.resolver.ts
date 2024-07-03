import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router } from '@angular/router';
import { PropertyDataService } from '@data-services/property-data.service';
import { SelectProperty } from '@schema/schema';

export const propertyResolver: ResolveFn<SelectProperty> = async (
    route: ActivatedRouteSnapshot,
) => {
    const propertyId = route.paramMap.get('propertyId');
    const redirectCommand = new RedirectCommand(inject(Router).parseUrl('/'), { skipLocationChange: true, });

    if (!propertyId) {
        return redirectCommand;
    }

    const {data: property} = await inject(PropertyDataService).readProperty(propertyId);

    if (!property) {
        return redirectCommand;
    }

    return property;
};
