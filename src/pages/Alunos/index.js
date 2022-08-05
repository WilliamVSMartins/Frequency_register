import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles.css';
import { toast } from 'react-toastify';

import alunos from './service';

const Alunos = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    alunos.getDisciplina(id)
      .then((response) => response.data)
      .then((response) => {
        setData(response)
      })
    }, [data]);


  const onDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete this record ?")) {

      alunos.remove(id)
        .then(function (response) {
          toast.success("User Delete Successfully");
        })
        .catch(function (error) {
          toast.error(error);
        });
    }
  };
  return (
    <div className="home">
      <table className="styled-table">
        <thead>
          <tr>
            <th>N° aluno</th>
            <th>Name</th>
            <th>Matrícula</th>
            <th>Tag</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {data.map((aluno) => (
              <tr key={aluno.id}>
                <th scope="row">{aluno.id}</th>
                <td>{aluno.name}</td>
                <td>{aluno.matr}</td>
                <td>{aluno.tag}</td>
                <td>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(aluno.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alunos;