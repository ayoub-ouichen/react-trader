import { useState } from 'react'
import Chart from '../Chart/Chart'
import Basic3 from '../Chart/basic3';
export default function Dashboard() {
  const [checkBox, setChekBox] = useState(new Array(100).fill(false))
  
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // janvier est 0 !
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  const [fin, setFin] = useState(today)
  yyyy = yyyy - 1
  today = yyyy + '-' + mm + '-' + dd;
  const [debut, setDebut] = useState(today)

  function updateCheckBox(index) {
    let checkBoxCopy = checkBox.slice();
    checkBoxCopy[index] = !checkBox[index];
    setChekBox(checkBoxCopy);
  }

  return (
    <div className=" mt-4">
      <div className="card">
        <div className="card-body">
          <Chart c={ checkBox } date_debut={debut} date_fin={fin} />
          {/* <<Basic3 date_debut={debut} date_fin={fin} /> */}
          <div className="row">
            <div className="col-md-6  mt-2">
              <div className="form-group">
                <label htmlFor="dateDebut">Date de début :</label>
                <input value={ debut } onChange={(e) => setDebut(e.target.value)} type="date" className="form-control" id="dateDebut" />
              </div>
            </div>
            <div className="col-md-6  mt-2">
              <div className="form-group">
                <label htmlFor="dateFin">Date de fin :</label>
                <input value={ fin } onChange={(e) => setFin(e.target.value)} type="date" className="form-control" id="dateFin" />
              </div>
            </div>
          </div>
          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={() => { updateCheckBox(0) }} />
            <label className="form-check-label" htmlFor="exampleCheck1">Candles Chart</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck2" onClick={() => { updateCheckBox(1) }} />
            <label className="form-check-label" htmlFor="exampleCheck2">High Line</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck3" onClick={() => { updateCheckBox(2) }} />
            <label className="form-check-label" htmlFor="exampleCheck3">Low Line</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck4" onClick={() => { updateCheckBox(3) }} />
            <label className="form-check-label" htmlFor="exampleCheck4">Point Max</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck5" onClick={() => { updateCheckBox(4) }} />
            <label className="form-check-label" htmlFor="exampleCheck5">Point Min</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck6" onClick={() => { updateCheckBox(5) }} />
            <label className="form-check-label" htmlFor="exampleCheck6">Resistance</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck7" onClick={() => { updateCheckBox(6) }} />
            <label className="form-check-label" htmlFor="exampleCheck7">Support</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck8" onClick={() => { updateCheckBox(7) }} />
            <label className="form-check-label" htmlFor="exampleCheck8">Up Trends</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck9" onClick={() => { updateCheckBox(8) }} />
            <label className="form-check-label" htmlFor="exampleCheck9">Down Trends</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck10" onClick={() => { updateCheckBox(9) }} />
            <label className="form-check-label" htmlFor="exampleCheck10">Simple Moving Average</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck11" onClick={() => { updateCheckBox(10) }} />
            <label className="form-check-label" htmlFor="exampleCheck11">MaxMinoidal</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck12" onClick={() => { updateCheckBox(11) }} />
            <label className="form-check-label" htmlFor="exampleCheck12">Eliott Waves 123/45</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck13" onClick={() => { updateCheckBox(12) }} />
            <label className="form-check-label" htmlFor="exampleCheck13">Eliott Waves 12345a/bc</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck14" onClick={() => { updateCheckBox(13) }} />
            <label className="form-check-label" htmlFor="exampleCheck14">Round Numbers</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck15" onClick={() => { updateCheckBox(14) }} />
            <label className="form-check-label" htmlFor="exampleCheck15">Horizontal level</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck16" onClick={() => { updateCheckBox(15) }} />
            <label className="form-check-label" htmlFor="exampleCheck16">Correlation Zone</label>
          </div>

          <div className="m-3 form-check d-inline-block">
            <input type="checkbox" className="form-check-input" id="exampleCheck17" onClick={() => { updateCheckBox(16) }} />
            <label className="form-check-label" htmlFor="exampleCheck17">Last Contact/First break</label>
          </div>

        </div>
      </div>
    </div>
  )
}
