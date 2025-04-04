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

  return <div>ManageDocument</div>;
};

export default ManageDocument;
