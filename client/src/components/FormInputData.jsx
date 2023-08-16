import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs ,
     doc, deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";
const FormInputData = () => {
  const [form, setForm] = useState({});
  const [data, setData] = useState([]);
    const [editId, setEditId]=useState(null)
  const tableinfoReff = collection(db, "tableinfo");

  //form รับข้อมูล
  const handleChang = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    

    const unsubscribe = loadRealtime()
    return ()=>{
        unsubscribe();
    }

  }, []);

  const loadRealtime =()=>{
        //onsnapshopจะช่วยในการติดตาม
        const unsubscribe = onSnapshot(tableinfoReff,(snapshot)=>{
            const newData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setData(newData);
        })
        return()=>{
            unsubscribe()
        }

    }

    //post send form create info to firebase Api
  const handleAddData = async () => {
    await addDoc(tableinfoReff, form)
      .then((res) => {
       
      })
      .catch((err) => console.log(err));
  };

  //get tableinfo from firebase  show all


  //delete info firebase
  const handleDelete = async (id) => {
    // 
    try {
        await deleteDoc(doc(tableinfoReff,id))
       
    } catch (error) {
        console.log(error)
    }
  };

  const handleCancel =()=>{
    setEditId(null)
    setForm({})
  }
  const handleSave = async(id)=>{
   try {
        await updateDoc(doc(tableinfoReff,id),form)
        setEditId(null)
   } catch (error) {
    console.log(err)
   }
  }

  console.log(editId)

  return (
    <div>
      <input onChange={handleChang} type="text" name="name" pattern="name" />{" "}
      <br />
      <input
        onChange={(e) => {
          handleChang(e);
        }}
        type="text"
        name="detail"
        pattern="detail"
      />{" "}
      <br />
      <input
        onChange={(e) => {
          handleChang(e);
        }}
        type="number"
        name="price"
        pattern="price"
      />{" "}
      <br />
      <button onClick={handleAddData}>Add data</button>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Number</th>
            <th scope="col">Name</th>
            <th scope="col">Detail</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
                <td>
               {
                editId===item.id ?
                (<>
                 <input onChange={handleChang} type="text" 
                 name="name" placeholder="name" 
                 value={form.name !== undefined ? form.name:item.name}
                 />
                </>):
                (item.name)
               }
                
                </td>
              <td>
              {
                editId===item.id ?
                (<>
                 <input onChange={handleChang} type="text" 
                 name="detail" placeholder="detail"
                 value={form.detail !== undefined ? form.detail:item.detail}
                 />
                </>):
                (item.detail)
               }

              </td>
              <td>
              {
                editId===item.id ?
                (<>
                 <input onChange={handleChang} type="number" 
                 name="price" placeholder="price"
                 value={form.price !== undefined ? form.price:item.price}
                 />
                </>):
                (item.name)
               }

              </td>

                {
                    editId === item.id ?
                    (<>
                    <button onClick={()=>handleSave(item.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                    </>):
                    (<> <td>
                        <button
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          Delete
                        </button>
                     
                        <button
                        onClick={()=>setEditId(item.id)}
                        >
                         Edit
                        </button>
                      </td></>)
                }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormInputData;
