import { LANGUAGES } from "constants";

export default {
  ...LANGUAGES.find((i) => i?.key === "id")?.locale,
  _button: {
    login: "Masuk",
    add: "Tambah",
    refresh: "Perbarui",
    reset_filter: "Hapus Pencarian",
    back: "Kembali",
    small: "Kecil",
    middle: "Sedang",
    large: "Besar",
    back_to_home: "Kembali ke halaman awal",
  },
  _checkbox: {
    remember: "Ingatkan Saya",
  },
  _label: {
    email: "Email",
    password: "Kata Sandi",
    profile: "Profil",
    setting: "Pengaturan",
    logout: "Keluar",
    direction: "Tampilan",
    size: "Ukuran",
    color: "Warna",
    radius: "Radius",
  },
  _text: {
    powered_by: "Didukung oleh",
    loader: "Sedang Memuat",
    search: "Cari",
  },
  _column: {
    name: "Nama",
    description: "Deskripsi",
    price: "Harga",
    slug: "Slug",
  },
  _menu: {
    dashboard: "Dashboard",
    master: "Master",
    products: "Produk",
    categories: "Kategori",
  },
  _confirm: {
    ok: "Ya, lanjutkan",
    cancel: "Batal",
    title_logout: "Keluar",
    content_logout: "Apakah anda yakin untuk melanjutkan ?",
  },
};
