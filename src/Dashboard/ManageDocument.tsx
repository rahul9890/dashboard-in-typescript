import axios from "axios";
import React, { useEffect, useState } from "react";

interface UserDocs {
  documentId: number;
  userEmail: string;
  fileName: string;
  fileData: string;
  fileType: string;
}

const ManageDocument: React.FC = () => {
  const [userDocList, setUserDocList] = useState<UserDocs[]>();
  const userDocumentURL = "http://localhost:8080/userdocument";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await axios.get(userDocumentURL);
        setUserDocList(responseData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

const handlePreview = (doc) => {
  //this code is future plan ,its not working now
};




  return (
    <div>
      <h2>My Uploads</h2>
      <table className="table table-info table-bordered">
        <thead>
          <tr>
            <th>File Name</th>
            <th>File Type</th>
            <th>File Operations</th>
          </tr>
        </thead>
        <tbody>
          {userDocList &&
            userDocList.length > 0 &&
            userDocList.map((item) => (
              <tr key={item.documentId}>
                <td>{item.fileName}</td>
                <td>{item.fileType}</td>
                <td>
                  <button type="button" className="btn btn-primary m-1" onClick={()=>handlePreview(item)}>
                    Preview
                  </button>
                  <button type="button" className="btn btn-warning m-1">
                    Edit
                  </button>
                  <button type="button" className="btn btn-info m-1">
                    Download
                  </button>
                  <button type="button" className="btn btn-danger m-1">
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

export default ManageDocument;
