
import { useEffect, useState } from 'react';
import axios from 'axios';
import { EyeOutlined } from '@ant-design/icons';
import { Button, Drawer, Table } from 'antd'; 


function UsersPage() {



  const [users, setUsers] = useState("")

  const [drawerVisible, setDrawerVisible] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
  

  useEffect(() =>{
    const fetchUsers = async () =>{
    try{
   
      const response = await axios.get("https://jsonplaceholder.typicode.com/users")
      
      setUsers(response.data)

    }catch(error){
  console.log(error)
  }
    }
    fetchUsers()
  }, [])

const usersDataSource = selectedUser ? [
  {
    key: '1',
    username: selectedUser.username,
    email: selectedUser.email,
    phone: selectedUser.phone,
    website: selectedUser.website,
    city: selectedUser.address.city,
    street: selectedUser.address.street,
    suite: selectedUser.address.suite,
    zipcode: selectedUser.address.zipcode,
    lat: selectedUser.address.geo.lat,
    lng: selectedUser.address.geo.lng,
  }
] : [];

 const usersCompanyDataSource = selectedUser ? [
  {    
key: '2',
  companyName: selectedUser.company.name,
  catchPhrase: selectedUser.company.catchPhrase,
  bs: selectedUser.company.bs,
}
  ] : [];

const columnsFirst = [
  {
    title: 'Kullanıcı Adı',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Telefon No',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
  },
  {
    title: 'Şehir',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Sokak',
    dataIndex: 'street',
    key: 'street',
  },
  {
    title: 'Suite',
    dataIndex: 'suite',
    key: 'suite',
  },
  {
    title: 'Posta Kodu',
    dataIndex: 'zipcode',
    key: 'zipcode',
  },
  {
    title: 'Enlem',
    dataIndex: 'lat',
    key: 'lat',
  },
  {
    title: 'Boylam',
    dataIndex: 'lng',
    key: 'lng',
  },
];

const columnsSecond = [  {
    title: 'Şirket Adı',
    dataIndex: 'companyName',
    key: 'companyName',
  },
  {
    title: 'Slogan',
    dataIndex: 'catchPhrase',
    key: 'catchPhrase',
  },
  {
    title: 'Strateji',
    dataIndex: 'bs',
    key: 'bs',
  }]


  
  return (
    

          <div>
            

              <div className="users-screen">
        {users.length > 0 && users.map((user) => (
          <div key={user.id} className="user">
            <div className="panel-color">
            </div>
<div className="usersinfo">
           <p><b> İsim:  </b>  {user.name}</p>
           <p><b> Kullanıcı Adı:  </b> {user.username}</p>
           </div>
 
    <Button
  icon={<EyeOutlined />}
  onClick={() => {
    setSelectedUser(user);
    setDrawerVisible(true);
  }}
/>
          </div>
                
        ))} </div>


            <Drawer
        title={selectedUser ? selectedUser.name : ""}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={500}
      >
        {selectedUser && (
          <>
          <div className="table-container">
            <h2>Kişisel Bilgiler</h2>
          <Table  scroll={{ x:  'max-content'}} dataSource={usersDataSource} columns={columnsFirst} />
          <h2>Şirket Bilgileri</h2>
          <Table  scroll={{ x: 'max-content' }} dataSource={usersCompanyDataSource} columns={columnsSecond} />
          </div>
        

          </>

        )}
      </Drawer>
    </div>
    
  )
}

export default UsersPage