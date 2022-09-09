import useSWR from "swr";
import { CategoryOutlined } from "@mui/icons-material";
import { CardMedia, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AdminLayout } from "../../components/layouts";
import { IProduct } from "../../interfaces";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Photo",
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <a href={`${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            component={"img"}
            className="fadeIn"
            alt={row.tile}
            image={`/products/${row.img}`}
          ></CardMedia>
        </a>
      );
    },
  },
  { field: "title", headerName: "Title", width: 300 },
  { field: "gender", headerName: "Gender" },
  { field: "type", headerName: "Type" },
  { field: "inStock", headerName: "Stock" },
  { field: "price", headerName: "Price" },
  { field: "sizes", headerName: "Sizes", width: 250 },
];

const ProductsPage = () => {
  const { data, error } = useSWR("/api/admin/products");
  if (!data && !error) return <></>;

  console.log(data);

  const rows = data!.map((product: IProduct) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes,
    slug: product.slug,
  }));

  return (
    <AdminLayout title={"Products"} subTitle={""} icon={<CategoryOutlined />}>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
