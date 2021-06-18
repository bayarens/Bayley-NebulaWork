// 1. What are the names and locations of all airports in Portugal? (name, city)

// 2. What are the names of all planes of the DC-10 version? (name)

// 3. How many engines does each plane have? (plane_name, number)

// 4. How many flights with a 2 or 3 hour duration are there in the database? (number)

// 5. What plane models have a version starting with A3? (modelcod, version)

// 6. What is the code and duration of all flights. Sort the answer from longest to shortest flight. If two flights have the same duration, sort them by flight code from smallest to largest (flightcod, duration).

// 7. Knowing that there are no direct flights from airport 1 (Porto) to airport 12 (London), which 2 legged flights can we use to travel between those airports? (flightcod1, flightcod2, intermediate_airport_code) Note: Use the airports codes (1 and 12) instead of the airport names in your query.

// 8. How many airports are there in each country? Sort the answer in ascending order. (country, number)?

// 9. What is the flight code, origin city and destination city of all flights in the database? Sort the answer by flight code. (flightcod, origin, destination)

// 10. What are the flight codes of all flights from Porto to Lisboa. (flightcod)? Note: Your query should use the city names, not the airport codes.

// 11. How many airports are there in each country? (country, number); show only countries with more than 2 airports.

// 12. What country, or countries, has more airports and how many? (country, number)

 /*  SELECT * FROM airport ORDER BY country ASC;
 airportcod |       name       |   city    |    country     
------------+------------------+-----------+----------------
          9 | Orly             | Paris     | France
          8 | Charles de Gaule | Paris     | France
          5 | Faro             | Faro      | Portugal
          2 | Madeira          | Funchal   | Portugal
          4 | Ponta Delgada    | S. Miguel | Portugal
          1 | Sa Carneiro      | Porto     | Portugal
          3 | Portela          | Lisboa    | Portugal
         11 | Heathrow         | Londres   | United Kingdom
         12 | Gatwick          | Londres   | United Kingdom
*/

// What is the flight code, origin city and destination city of all flights in the database? Sort the answer by flight code. (flightcod, origin, destination)

/* SELECT * FROM flight ORDER BY flightcod ASC;
 flightcod | fromairportcod | toairportcod |  company   | duration | planecod 
-----------+----------------+--------------+------------+----------+----------
      1001 |              1 |            2 | TAP        |        2 |        1
      1002 |              2 |            3 | TAP        |        1 |        2
      1003 |              2 |           12 | BA         |        2 |        5
      1004 |              4 |            3 | SATA       |        3 |        6
      1005 |              9 |            2 | AirFrance  |        2 |        3
      1006 |              8 |           11 | BA         |        1 |        5
      1007 |              5 |            1 | TAP        |        1 |        5
      1008 |              3 |           12 | Portugalia |        3 |        4
      1009 |              1 |            3 | Portugalia |        1 |        2
      1010 |             12 |            4 | BA         |        3 |        3
      1111 |              1 |            3 | TAP        |        2 |        3

SELECT * FROM airport;
 airportcod |       name       |   city    |    country     
------------+------------------+-----------+----------------
          1 | Sa Carneiro      | Porto     | Portugal
          3 | Portela          | Lisboa    | Portugal
          5 | Faro             | Faro      | Portugal
          2 | Madeira          | Funchal   | Portugal
          4 | Ponta Delgada    | S. Miguel | Portugal
          9 | Orly             | Paris     | France
          8 | Charles de Gaule | Paris     | France
         11 | Heathrow         | Londres   | United Kingdom
         12 | Gatwick          | Londres   | United Kingdom
*/

// What are the flight codes of all flights from Porto to Lisboa. (flightcod)? Note: Your query should use the city names, not the airport codes.

/*SELECT * FROM flight WHERE fromairportcod = 1 AND toairportcod = 3;
 flightcod | fromairportcod | toairportcod |  company   | duration | planecod 
-----------+----------------+--------------+------------+----------+----------
      1009 |              1 |            3 | Portugalia |        1 |        2
      1111 |              1 |            3 | TAP        |        2 |        3
(2 rows)
*/

// How many airports are there in each country? (country, number); show only countries with more than 2 airports.
// France-2, United Kingdom-2, Portugal-5  

// What country, or countries, has more airports and how many? (country, number)
    //Portugal by 3 


// 13. How many actual planes are there for each plane model. Sort the result so that least frequent models appear last (make, version, number). Note: You do not need to show models that do not have planes.

/*SELECT * FROM plane WHERE modelcod > 0 ORDER BY modelcod ASC;
 planecod |     name      | modelcod 
----------+---------------+----------
        9 | Douglas Adams |        1
        2 | Milo Manara   |        1
        1 | Scott Adams   |        1
        8 | Franquin      |        3
        4 | Henki Bilal   |        3
        7 | J R R Tolkien |        3
        6 | Bill Waterson |        4
        5 | Gary Larson   |        4
        3 | Serpieri      |        5
*/

// How many actual planes are there for each plane model. Sort the result so that least frequent models appear last (make, version, number). Note: Also show models that do not have planes.

/*SELECT * FROM plane ORDER BY modelcod ASC;
 planecod |     name      | modelcod 
----------+---------------+----------
        9 | Douglas Adams |        1
        2 | Milo Manara   |        1
        1 | Scott Adams   |        1
        8 | Franquin      |        3
        4 | Henki Bilal   |        3
        7 | J R R Tolkien |        3
        6 | Bill Waterson |        4
        5 | Gary Larson   |        4
        3 | Serpieri      |        5
*/
