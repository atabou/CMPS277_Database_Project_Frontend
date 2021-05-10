

class GraphComponent extends HTMLElement {

    constructor( ) {

        super();

    }

    connectedCallback() {
        
        this.innerHTML = /*html*/`
            
            <div style="display: flex; width: 100%; height: 500px">
                <div id="curve_chart_1" style="width: 50%;"></div>
                <div id="curve_chart_2" style="width: 50%;"></div>
            </div>

        `;
        
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawCharts);

        function drawCharts() {
            
            fetch(

                "http://127.0.0.1:5000/api/dashboard" 
            
            ).then ( (res) => {
    
                return res.json();
    
            }).then( (data) => {
    
                let chart1 = [ ['Date', 'Vaccinated', 'Target'] ];
                
                if( data[0].length > 0 ) { 

                    for( let i=0; i<data[0].length; i++ ) {
                        let date = new Date(data[0][i].Date);
                        chart1.push( [date.getFullYear() + "-" + (date.getMonth() + 1) + '-' + date.getDate(), data[0][i].Total, 100] );
                    }

                } else {
                    chart1.push( [Date.now().getFullYear() + "-" + (Date.now().getMonth() + 1) + '-' + Date.now().getDate(), 0, 100] )
                }

                let dataTable1 = google.visualization.arrayToDataTable(chart1);

                var options1 = {
                    title: 'Total Number of Vaccinations',
                    curveType: 'function',
                    legend: { position: 'bottom' }
                };

                let LineChart1 = new google.visualization.LineChart(document.getElementById('curve_chart_1'));

                LineChart1.draw(dataTable1, options1);

                let chart2 = [ ['Date', 'Vaccinated', 'Target'] ];
                
                console.log(data);

                if( data[1].length > 0 ) { 

                    for( let i=0; i<data[1].length; i++ ) {
                        let date = new Date(data[1][i].Date);
                        chart2.push( [date.getFullYear() + "-" + (date.getMonth() + 1) + '-' + date.getDate(), data[1][i].Total, 100] )
                    }

                } else {

                    let date = new Date();
                    console.log(date.getFullYear() + "-" + (date.getMonth() + 1) + '-' + date.getDate());
                    chart2.push( [date.getFullYear() + "-" + (date.getMonth() + 1) + '-' + date.getDate(), 0, 100] )

                }

                let dataTable2 = google.visualization.arrayToDataTable(chart2);

                var options2 = {
                    title: 'Total Number of People Vaccinated Twice',
                    curveType: 'function',
                    legend: { position: 'bottom' }
                };

                let LineChart2 = new google.visualization.LineChart(document.getElementById('curve_chart_2'));

                LineChart2.draw(dataTable2, options2);
                    
    
            }).catch( (err) => {
    
                console.log(err);
            
            });
        }

    }


}


window.customElements.define('graph-component', GraphComponent);
    