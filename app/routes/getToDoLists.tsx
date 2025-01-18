import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

const ProductForm: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  // เพิ่มสินค้าใหม่
  const addProduct = () => {
    if (name && price) {
      const newProduct: Product = {
        id: products.length + 1,
        name,
        price: parseFloat(price),
        image: image || undefined,
      };
      setProducts([...products, newProduct]);
      clearForm();
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  // ล้างข้อมูลฟอร์ม
  const clearForm = () => {
    setName("");
    setPrice("");
    setImage("");
  };

  // ยืนยันการลบสินค้า
  const confirmDelete = (id: number) => {
    setShowPopup(true);
    setProductToDelete(id);
  };

  // ลบสินค้า
  const deleteProduct = () => {
    if (productToDelete !== null) {
      setProducts(products.filter((product) => product.id !== productToDelete));
      setShowPopup(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">จัดการข้อมูลสินค้า</h2>

      {/* ฟอร์มเพิ่มสินค้า */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">ชื่อสินค้า</label>
            <input
              type="text"
              placeholder="ชื่อสินค้า"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">ราคา</label>
            <input
              type="number"
              placeholder="ราคา"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700">รูปภาพ</label>
            <input
              type="text"
              placeholder="URL รูปภาพ"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ปุ่มบันทึกและเคลียร์ */}
        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={addProduct}
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-all"
          >
            บันทึก
          </button>
          <button
            onClick={clearForm}
            className="bg-gray-400 text-white py-3 px-6 rounded-md hover:bg-gray-500 transition-all"
          >
            เคลียร์
          </button>
        </div>
      </div>

      {/* ตารางแสดงสินค้า */}
      <table className="mt-8 w-full max-w-4xl border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">No.</th>
            <th className="p-3">ชื่อสินค้า</th>
            <th className="p-3">ราคา</th>
            <th className="p-3">รูปภาพ</th>
            <th className="p-3">ดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.id} className="text-center border-b border-gray-200">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.price.toFixed(2)}</td>
                <td className="p-3">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-12 h-12 mx-auto" />
                  ) : (
                    "ไม่มีรูปภาพ"
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => confirmDelete(product.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-3 text-gray-500 text-center">ยังไม่มีสินค้าที่เพิ่ม</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pop-up confirmation */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center w-1/3">
            <p className="mb-4 text-lg font-semibold text-gray-800">คุณต้องการลบสินค้านี้หรือไม่?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={deleteProduct}
                className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition-all"
              >
                ยืนยัน
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400 transition-all"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;

