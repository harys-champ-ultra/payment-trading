let count = 0
const hamburger = () => {
    count++
    if (count % 2 !== 0) {
        document.querySelector(".mobile").style.display = "flex"
    } else {
        document.querySelector(".mobile").style.display = "none"
    }
}
const remover = () => {
    document.querySelector(".mobile").style.display = "none"
}

// for clients search
$(document).ready(function () {
    $("#searchClients").on("keyup", function () {
        let value = $(this).val().toLowerCase()
        $("#showclients tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
    })
})

// for deposit pay search
$(document).ready(function () {
    $("#searchDeposit").on("keyup", function () {
        let value = $(this).val().toLowerCase()
        $("#showdeposit tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
    })
})

// for withdraw pay search
$(document).ready(function () {
    $("#searchWithdraw").on("keyup", function () {
        let value = $(this).val().toLowerCase()
        $("#showwithdraw tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
    })
})

// for feedback search
$(document).ready(function () {
    $("#searchFeedback").on("keyup", function () {
        let value = $(this).val().toLowerCase()
        $("#showfeedback tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
    })
})

// chart
window.Promise ||
    document.write(
        '<script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js"><\/script>'
    )
window.Promise ||
    document.write(
        '<script src="https://cdn.jsdelivr.net/npm/eligrey-classlist-js-polyfill@1.2.20171210/classList.min.js"><\/script>'
    )
window.Promise ||
    document.write(
        '<script src="https://cdn.jsdelivr.net/npm/findindex_polyfill_mdn"><\/script>'
    )

let _seed = 42;
Math.random = function () {
    _seed = _seed * 16807 % 2147483647;
    return (_seed - 1) / 2147483646;
};

let options = {
    series: [{
        name: "Session Duration",
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
    },
    {
        name: "Page Views",
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    },
    {
        name: 'Total Visits',
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
    }
    ],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [5, 7, 5],
        curve: 'straight',
        dashArray: [0, 8, 5]
    },
    title: {
        text: 'Page Statistics',
        align: 'left'
    },
    legend: {
        tooltipHoverFormatter: function (val, opts) {
            return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
        }
    },
    markers: {
        size: 0,
        hover: {
            sizeOffset: 6
        }
    },
    xaxis: {
        categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
            '10 Jan', '11 Jan', '12 Jan'
        ],
    },
    tooltip: {
        y: [
            {
                title: {
                    formatter: function (val) {
                        return val + " (mins)"
                    }
                }
            },
            {
                title: {
                    formatter: function (val) {
                        return val + " per session"
                    }
                }
            },
            {
                title: {
                    formatter: function (val) {
                        return val;
                    }
                }
            }
        ]
    },
    grid: {
        borderColor: '#f1f1f1',
    }
};

let chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();