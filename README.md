# API for maps on mietenwatch.de

This API serves data for maps on different zoom levels on mietenwatch.de

## Using the API

1. install Node dependencies `npm install`
2. run API `node ./www/bin`
3. send GET request to `http://localhost:4000` using routes as described below

## Routes

### Individual Affordability Map
#### Fetching data for individual affordability map (zoom level 0, Berlin total)
Fetches aggregated affordability data for Berlin and for its so called Ortsteile (medium sized administratative districts).

*  Request `GET` `/api/affordability/berlin/:income/:rooms/:socialHousing` 
   *  `income` (integer): income to use to calculate affordability
   *  `rooms` (integer): number of rooms to use to filter offers
   *  `socialHousing`: if set to `excludeSocialHousing` offers requiring a so called Wohnberechtigungsschein (permit for subsidized housing) will be excluded from the response

*  Response
 
   *  `berlinData`: data for Berlin total
        *  `berlin_totalFlats` (integer): count of total flats for the filter params used in the request
        *  `berlin_affordableFlats` (integer): count of affordable flats for the filter params used in the request
        *  `berlin_soaf` (float): share of affordable flats for the filter params used in the request
 
   *  `resData`: data for respective Ortsteile
        *  `ot_id` (integer): ID of the Ortsteil
        *  `ot_name` (string): name of the Ortsteil
        *  `ot_totalFlats` (integer): count of total flats within respective Ortsteil
        *  `ot_affordableFlats` (integer): count of affordable flats within respective Ortsteil
        *  `ot_soaf` (float): share of affordable flats

#### Fetching data for individual affordability map (zoom level 1 using bounding box)
Fetches offers data for requested bounding box.

*  Request `GET` `/api/affordability/:bbox/:income/:rooms/:socialHousing` 

   *  `bbox` (string): string setting the bounding box `NW latitude, NW longitude, SE latitude, SE longitude` e.g. `52.501750,13.358173,52.510788,13.40023`
   *  `rooms` (integer): number of rooms to use to filter offers
   *  `socialHousing`: if set to `excludeSocialHousing` offers requiring a so called Wohnberechtigungsschein (permit for subsidized housing) will be excluded from the response
   *  `income`: income to use to calculate affordability

*  Response

   *  `resData`: data for respective bounding box
   
        *  `geo_lon` (float): longitude of the offer
        *  `geo_lat` (float): latitude of the offer
        *  `obj_flatSize` (float): flat size of the offer
        *  `obj_rooms` (float): number of rooms of the offer
        *  `cst_totalCosts` (float): total cost of the offer
        *  `cst_affordable` (boolean): is flat affordable

### Average Affordability Map
Fetches data for average incomes excludes subsidized offers.

#### Fetching data for average affordability map (zoom level 0, Berlin total)
Fetches aggregated affordability data for Berlin and for its so called Ortsteile (medium sized administratative districts).

*  Request `GET` `/api/affordabilityAVG/berlin/:income/:persons/:socialHousing` 
   *  `income` (integer): income to use to calculate affordability
   *  `persons` (integer): number of persons to use to filter offers
   *  `socialHousing`: if set to `excludeSocialHousing` offers requiring a so called Wohnberechtigungsschein (permit for subsidized housing) will be excluded from the response

*  Response
 
   *  `berlinData`: data for Berlin total
        *  `berlin_totalFlats` (integer): count of total flats for the filter params used in the request
        *  `berlin_affordableFlats` (integer): count of affordable flats for the filter params used in the request
        *  `berlin_soaf` (float): share of affordable flats for the filter params used in the request
 
   *  `resData`: data for respective Ortsteile
        *  `ot_id` (integer): ID of the Ortsteil
        *  `ot_name` (string): name of the Ortsteil
        *  `ot_totalFlats` (integer): count of total flats within respective Ortsteil
        *  `ot_affordableFlats` (integer): count of affordable flats within respective Ortsteil
        *  `ot_soaf` (float): share of affordable flats

#### Fetching data for average affordability map (zoom level 1 using bounding box)
Fetches offers data for requested bounding box.

*  Request `GET` `/api/affordabilityAVG/:bbox/:income/:persons` 

   *  `bbox` (string): string setting the bounding box `NW latitude, NW longitude, SE latitude, SE longitude` e.g. `52.501750,13.358173,52.510788,13.40023`
   *  `persons` (integer): number of persons to use to filter offers
   *  `income`: income to use to calculate affordability

*  Response

   *  `resData`: data for respective bounding box
   
        *  `geo_lon` (float): longitude of the offer
        *  `geo_lat` (float): latitude of the offer
        *  `obj_flatSize` (float): flat size of the offer
        *  `obj_rooms` (float): number of rooms of the offer
        *  `cst_totalCosts` (float): total cost of the offer
        *  `cst_affordable` (boolean): is flat affordable

#### Fetching data for average affordability map (zoom level 1 using bounding box)
Fetches offers data for requested bounding box.

*  Request `GET` `/api/affordabilityAVG/:bbox/:income/:persons` 

   *  `bbox` (string): string setting the bounding box `NW latitude, NW longitude, SE latitude, SE longitude` e.g. `52.501750,13.358173,52.510788,13.40023`
   *  `persons` (integer): number of persons to use to filter offers
   *  `income` (nteger): income to use to calculate affordability

*  Response

   *  `resData`: data for respective bouding box
   
        *  `geo_lon` (float): longitude of the offer
        *  `geo_lat` (float): latitude of the offer
        *  `obj_flatSize` (float): flat size of the offer
        *  `obj_rooms` (float): number of rooms of the offer
        *  `cst_totalCosts` (float): total cost of the offer
        *  `cst_affordable` (boolean): is flat affordable


### Hartz IV Affordability Map
Fetches data affordability data for maximum rent costs paid for people receiving Hartz IV social welfare.

#### Fetching data for Hartz IV affordability map (zoom level 0, Berlin total)
Fetches aggregated affordability data for Berlin and for its so called Ortsteile (medium sized administratative districts).

*  Request `GET` `/api/affordabilityH4/berlin/:income/:persons/` 
   *  `income` (integer): income to use to calculate affordability
   *  `persons` (integer): number of persons to use to filter offers
   *  `income`: income to use to calculate affordability (in this case maximum Kosten der Unterkunft covered)

*  Response
 
   *  `berlinData`: data for Berlin total
        *  `berlin_totalFlats` (integer): count of total flats for the filter params used in the request
        *  `berlin_affordableFlats` (integer): count of affordable flats for the filter params used in the request
        *  `berlin_soaf` (float): share of affordable flats for the filter params used in the request
 
   *  `resData`: data for respective Ortsteile
        *  `ot_id` (integer): ID of the Ortsteil
        *  `ot_name` (string): name of the Ortsteil
        *  `ot_totalFlats` (integer): count of total flats within respective Ortsteil
        *  `ot_affordableFlats` (integer): count of affordable flats within respective Ortsteil
        *  `ot_soaf` (float): share of affordable flats

#### Fetching data for Hartz IV affordability map (zoom level 1 using bounding box)
Fetches offers data for requested bounding box.

*  Request `GET` `/api/affordabilityH4/:bbox/:income/:rooms/:socialHousing` 

   *  `bbox` (string): string setting the bounding box `NW latitude, NW longitude, SE latitude, SE longitude` e.g. `52.501750,13.358173,52.510788,13.40023`
   *  `rooms` (integer): number of rooms to use to filter offers
   *  `income`: income to use to calculate affordability (in this case maximum Kosten der Unterkunft covered)

*  Response

   *  `resData`: data for respective bouding box
   
        *  `geo_lon` (float): longitude of the offer
        *  `geo_lat` (float): latitude of the offer
        *  `obj_flatSize` (float): flat size of the offer
        *  `obj_rooms` (float): number of rooms of the offer
        *  `cst_totalCosts` (float): total cost of the offer
        *  `cst_affordable` (boolean): is flat affordable

### Mietendeckel Affordability Map
#### Fetching data for Mietendeckel affordability map without Mietendeckel (zoom level 0, Berlin total)
Fetches aggregated affordability data for Berlin and for its so called Ortsteile (medium sized administratative districts).

*  Request `GET` `/api/affordabilityWoRL/berlin/:income/:rooms` 
   *  `income` (integer): income to use to calculate affordability
   *  `rooms` (integer): number of rooms to use to filter offers

*  Response
 
   *  `berlinData`: data for Berlin total
        *  `berlin_totalFlats` (integer): count of total flats for the filter params used in the request
        *  `berlin_affordableFlats` (integer): count of affordable flats for the filter params used in the request
        *  `berlin_soaf` (float): share of affordable flats for the filter params used in the request
 
   *  `resData`: data for respective Ortsteile
        *  `ot_id` (integer): ID of the Ortsteil
        *  `ot_name` (string): name of the Ortsteil
        *  `ot_totalFlats` (integer): count of total flats within respective Ortsteil
        *  `ot_affordableFlats` (integer): count of affordable flats within respective Ortsteil
        *  `ot_soaf` (float): share of affordable flats

#### Fetching data for Mietendeckel affordability map without Mietendeckel (zoom level 1 using bounding box)
Fetches offers data for requested bounding box.

*  Request `GET` `/api/affordabilityWoRL/:bbox/:income/:rooms` 

   *  `bbox` (string): string setting the bounding box `NW latitude, NW longitude, SE latitude, SE longitude` e.g. `52.501750,13.358173,52.510788,13.40023`
   *  `rooms` (integer): number of rooms to use to filter offers
   *  `income`: income to use to calculate affordability

*  Response

   *  `resData`: data for respective bounding box
   
        *  `geo_lon` (float): longitude of the offer
        *  `geo_lat` (float): latitude of the offer
        *  `obj_flatSize` (float): flat size of the offer
        *  `obj_rooms` (float): number of rooms of the offer
        *  `cst_totalCosts` (float): total cost of the offer
        *  `cst_affordable` (boolean): is flat affordable
 
#### Fetching data for Mietendeckel affordability map with Mietendeckel (zoom level 0, Berlin total)
Fetches aggregated affordability data for Berlin and for its so called Ortsteile (medium sized administratative districts).

*  Request `GET` `/api/affordabilityWRL/berlin/:income/:rooms` 
   *  `income` (integer): income to use to calculate affordability
   *  `rooms` (integer): number of rooms to use to filter offers

*  Response
 
   *  `berlinData`: data for Berlin total
        *  `berlin_totalFlats` (integer): count of total flats for the filter params used in the request
        *  `berlin_affordableFlats` (integer): count of affordable flats for the filter params used in the request with Mietendeckel applied
        *  `berlin_soaf` (float): share of affordable flats for the filter params used in the request with Mietendeckel applied
 
   *  `resData`: data for respective Ortsteile
        *  `ot_id` (integer): ID of the Ortsteil
        *  `ot_name` (string): name of the Ortsteil
        *  `ot_totalFlats` (integer): count of total flats within respective Ortsteil
        *  `ot_affordableFlats` (integer): count of affordable flats within respective Ortsteil with Mietendeckel applied
        *  `ot_soaf` (float): share of affordable flats with Mietendeckel applied

#### Fetching data for Mietendeckel affordability map with Mietendeckel (zoom level 1 using bounding box)
Fetches offers data for requested bounding box.

*  Request `GET` `/api/affordabilityWRL/:bbox/:income/:rooms` 

   *  `bbox` (string): string setting the bounding box `NW latitude, NW longitude, SE latitude, SE longitude` e.g. `52.501750,13.358173,52.510788,13.40023`
   *  `rooms` (integer): number of rooms to use to filter offers
   *  `income`: income to use to calculate affordability

*  Response

   *  `resData`: data for respective bounding box
   
        *  `geo_lon` (float): longitude of the offer
        *  `geo_lat` (float): latitude of the offer
        *  `obj_flatSize` (float): flat size of the offer
        *  `obj_rooms` (float): number of rooms of the offer
        *  `cst_totalCosts` (float): total cost of the offer with Mietendeckel applied
        *  `cst_affordable` (boolean): is flat affordable if Mietendeckel is applied

 This project was funded by the German Federal Ministry of Education and Research within the Prototype Fund funding line organized by Open Knowledge Fundation.


![gefördert vom BMBF](https://raw.githubusercontent.com/mietenwatch/mietenwatch/master/static/bmbfgefoerdert.jpg)