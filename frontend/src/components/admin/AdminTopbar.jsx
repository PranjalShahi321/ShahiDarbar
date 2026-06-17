function AdminTopbar() {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );
  
    return (
      <div
        className="
          bg-white
          shadow
          rounded-3xl
          p-6
          flex
          justify-between
          items-center
          mb-8
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-bold
            "
          >
            Welcome,
            {" "}
            {userInfo?.name}
            👋
          </h1>
  
          <p className="text-gray-500">
            Manage your grocery business.
          </p>
        </div>
  
        <div
          className="
            bg-green-100
            text-green-700
            px-6
            py-3
            rounded-full
            font-semibold
          "
        >
          Admin Panel
        </div>
      </div>
    );
  }
  
  export default AdminTopbar;