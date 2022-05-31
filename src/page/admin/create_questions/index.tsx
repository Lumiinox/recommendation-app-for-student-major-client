import React, { useState } from 'react';
import axios from 'axios';

interface DataPertanyaan {
  id: number;
  kode_soal: string;
  kode_tipe: string;
  kunci_jawaban: string;
  pertanyaan: string;
  pilihan_1: string;
  pilihan_2: string;
  pilihan_3: string;
  pilihan_4: string;
}


export default function AdminCreateQuestion (){
    
  const [kodeSoal, setKodeSoal] = useState('');
  const [kodeTipe, setkodeTipe] = useState('');
  const [pertanyaan, setpertanyaan] = useState('');
  const [pilihan1, setpilihan1] = useState('');
  const [pilihan2, setpilihan2] = useState('');
  const [pilihan3, setpilihan3] = useState('');
  const [pilihan4, setpilihan4] = useState('');
  const [kunciJawaban, setKunciJawaban] = useState('');

  const [dataPertanyaan, setDataPertanyaan] = useState<DataPertanyaan[]>([]);

  const SubmitQuestion = async () => {
    console.log("test")
    await axios.post('http://localhost:3001/api/insert/question/', {
      kodeSoal      : kodeSoal, 
      kodeTipe      : kodeTipe,
      pertanyaan    : pertanyaan, 
      pilihan1      : pilihan1,
      pilihan2      : pilihan2, 
      pilihan3      : pilihan3,
      pilihan4      : pilihan4, 
      kunciJawaban  : kunciJawaban,
    }).then((res)=>{
      alert("Successful Insert");
    })
  }

  const ShowQuestion = async () => {
    axios.get('http://localhost:3001/api/get/questions')
    .then((response) => {
      console.log(response.data)
      setDataPertanyaan(response.data);
    })
  }

  return(
      <>
        <h1>Test Run</h1>
        <div className="form">
            <label>Kode Soal</label>
            <input type="text" name="kodeSoal" onChange={(e) => {setKodeSoal(e.target.value)}}></input>
            <br/>
            <label>Kode Tipe</label>
            <input type="text" name="kodeTipe" onChange={(e) => {setkodeTipe(e.target.value)}}></input>
            <br/>
            <label>Pertanyaan</label>
            <input type="text" name="pertanyaan" onChange={(e) => {setpertanyaan(e.target.value)}}></input>
            <br/>
            <label>Pilihan 1</label>
            <input type="text" name="pilihan1" onChange={(e) => {setpilihan1(e.target.value)}}></input>
            <br/>
            <label>Pilihan 2</label>
            <input type="text" name="pilihan2" onChange={(e) => {setpilihan2(e.target.value)}}></input>
            <br/>
            <label>Pilihan 3</label>
            <input type="text" name="pilihan3" onChange={(e) => {setpilihan3(e.target.value)}}></input>
            <br/>
            <label>Pilihan 4</label>
            <input type="text" name="pilihan4" onChange={(e) => {setpilihan4(e.target.value)}}></input>
            <br/>
            <label>Kunci Jawaban</label>
            <input type="text" name="kunciJawaban" onChange={(e) => {setKunciJawaban(e.target.value)}}></input>
            <br/>
            <button onClick={SubmitQuestion}>Submit</button>
            <button onClick={ShowQuestion}>Show Question</button>
        </div>
        <br/>
        <br/>
        {dataPertanyaan.map((value) => {
            return (
            <>
                <br/>
                <br/>
                <div>
                <p>{`${value.id}. ${value.pertanyaan}`}</p>
                <p>{`A. ${value.pilihan_1}`}</p>
                <p>{`B. ${value.pilihan_2}`}</p>
                <p>{`C. ${value.pilihan_3}`}</p>
                <p>{`D. ${value.pilihan_4}`}</p>
                <p>{`Kode Soal: ${value.kode_soal}`}</p>
                <p>{`Kode Tipe: ${value.kode_tipe}`}</p>
                </div>
            </>
            )
        })}
      </>
  )
}