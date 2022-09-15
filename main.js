$(document).ready(function () {
    function getAjax(url, section) {
        $(section).html("");
        $.ajax({
            url: url,
            method: "GET",
        }).done(function (result) {
            $.each(result, function (key, val) {
                if (Array.isArray(val)) {
                    $.each(val, function (k, v) {
                        $(section).append(`${key}: <a id="${key}${k}">${v}</a><br>`);
                        $(`#${key}${k}`).on("click", function (event) {
                            getAjax(v, "#resultSecond");
                        });
                    });
                } else if (key === "homeworld" || key === "url") {
                    $(section).append(`${key}: <a id="${key}">${val}</a><br><br>`);
                    $(`#${key}`).on("click", function (event) {
                        getAjax(val, "#resultSecond");
                    });
                } else if (key === "name" || key === "title") {
                    $(section).append(`<div class="titleSearchResult">${key}: ${val}</div><br>`);
                } else {
                    $(section).append(`<div>${key}: ${val}</div><br>`);
                }
            });
        });
    }

    $(`#submit`).on("click", function (event) {
        let value = $("#search").val();
        let directories = $("#directories").val();
        let url = `https://swapi.dev/api/${directories}/?search=${value}`;
        getAjaxSearch(url, "#result");
    });
    function getAjaxSearch(url, section) {
        $(section).html("");
        $.ajax({
            url: url,
            method: "GET",
        }).done(function (result) {
            $.each(Object.values(result["results"]), function (key, value) {
                $.each(value, function (el, val) {
                    if (Array.isArray(val)) {
                        $.each(val, function (k, v) {
                            $(section).append(`${el}: <a id="${el}${key}${k}">${v}</a><br>`);
                            $(`#${el}${key}${k}`).on("click", function (event) {
                                getAjax(v, "#resultSecond");
                            });
                        });
                    } else if (el === "homeworld" || el === "url") {
                        $(section).append(`${el}: <a id="${el}${key}">${val}</a><br><br>`);
                        $(`#${el}${key}`).on("click", function (event) {
                            getAjax(val, "#resultSecond");
                        });
                    } else if (el === "name" || el === "title") {
                        $(section).append(`<div class="titleSearchResult">${el}: ${val}</div><br>`);
                    } else {
                        $(section).append(`<div>${el}: ${val}</div><br>`);
                    }
                });
            });
        });
    }

    const keysArr = [
        "#film1",
        "#film2",
        "#film3",
        "#film4",
        "#film5",
        "#film6",
        "#filmsLink",
        "#peopleLink",
        "#planetsLink",
        "#speciesLink",
        "#starshipsLink",
        "#vehiclesLink",
    ];

    const linksArr = [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/4/",
        "https://swapi.dev/api/films/5/",
        "https://swapi.dev/api/films/6/",
        "https://swapi.dev/api/films/",
        "https://swapi.dev/api/people/",
        "https://swapi.dev/api/planets/",
        "https://swapi.dev/api/species/",
        "https://swapi.dev/api/starships/",
        "https://swapi.dev/api/vehicles/",
    ];

    $.each(keysArr, function (index, value) {
        if (keysArr[index].endsWith("Link")) {
            $(keysArr[index]).on("click", function (event) {
                getAjaxSearch(linksArr[index], "#result");
            });
        } else {
            $(keysArr[index]).on("click", function (event) {
                getAjax(linksArr[index], "#result");
            });
        }
    });
});
