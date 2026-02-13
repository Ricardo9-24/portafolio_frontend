import { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender, type ColumnDef } from "@tanstack/react-table";
import { SquarePenIcon, Trash2Icon, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import FormLenguage from "../components/modals/FormLenguage";
import withReactContent from "sweetalert2-react-content";
import type { Lenguage } from "../types/Lenguage";
import Swal from "sweetalert2";
import axios from "axios";
import "../styles/App.css";
const API_URL = import.meta.env.VITE_REACT_API_URL;

const Excescises = () => {
    const [data, setData] = useState<Lenguage[]>([]);
    const [dataEdit, setDataEdit] = useState<Lenguage | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [globalFilter, setGlobalFilter] = useState('')
    const MySwal = withReactContent(Swal);
    const URL_BASE = window.location.origin;

    const columns: ColumnDef<Lenguage>[] = [
        { header: 'ID', accessorKey: 'lenguaje_id' },
        { header: 'Categoría', accessorKey: 'categoria' },
        { header: 'Nombre', accessorKey: 'nombre' },
        { header: 'Descripción', accessorKey: 'descripcion' },
        { header: 'Tiempo', accessorKey: 'tiempo' },
        {
            header: "acciones",
            cell: ({ row }) => (
                <div className="d-flex gap-2">
                    <button
                        onClick={() => openUpdate(row.original)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm btn btn-primary"
                    >
                        <SquarePenIcon />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original.lenguaje_id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm btn btn-danger"
                    >
                        <Trash2Icon />
                    </button>
                </div>
            )
        }
    ]

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()

    })

    //Get data from theLenguages from API developed in Node JS
    const getData = async () => {
        try {
            if (!API_URL) {
                setError(new Error("API no found"));
                return;
            }
            const response = await axios.get(API_URL);
            setData(response.data)
        } catch (error) {
            setError(error instanceof Error ? error : new Error(String(error)));
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const openAdd = () => {
        setIsOpen(true)
        setDataEdit(null)
    }

    const openUpdate = (val: Lenguage) => {
        setDataEdit(val)
        setIsOpen(true)
    }

    const handleAddEdit = async (formData: Lenguage) => {
        let response;
        try {
            if (dataEdit)
                response = await axios.put(API_URL, formData);
            else
                response = await axios.post(API_URL, formData);

            if (response.status == 200) {
                MySwal.fire({
                    icon: "success",
                    title: "¡Operación exitosa!",
                    text: response.data.message,
                })
                getData()
                setIsOpen(false)
            } else {
                MySwal.fire({
                    icon: "warning",
                    title: "¡Lo sentimos!",
                    text: response.data.message
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = (val: number) => {
        MySwal.fire({
            icon: "warning",
            title: "¡Cuidado!",
            text: "¿Estas seguro que desea eliminar el lenguaje?",
            confirmButtonText: "Si, eliminar",
            confirmButtonColor: "#dd0000",
            cancelButtonColor: "#0d6efd",
            showCancelButton: true,
            reverseButtons: true
        }).then((confirm) => {
            if (confirm.isConfirmed) {
                axios.delete(API_URL, {
                    data: { lenguaje_id: val }
                }).then(resp => {
                    if (resp.status == 200) {
                        MySwal.fire({
                            icon: "success",
                            title: "¡Operación exitosa!",
                            text: resp.data.message
                        })
                        getData()
                    }
                })
            }
        })

    }

    const onCancel = () => {
        setIsOpen(false)
    }

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return <div className="text-center">
            <h1 className="display-1 fw-bold text-danger">Administración de lenguajes</h1>
            <p className="fs-3">¡Lo sentimos!</p>
            <p className="lead"> La página esta inhabilitada temporalmente.</p>
            <a href={URL_BASE + `/#contacto`} className="btn btn-primary">Informar al ING. Ricardo Hernández</a>
        </div>

    }

    return (
        <>
            {data && (
                <div className="container">
                    <div className="">
                        <h2 className="display-6">Gestion de lenguajes</h2>
                        <p className="lead">
                            En esta sección se gestionan las habilidades técnicas almancenados en una Base de Datos MySQL
                            alojada en un servicio de AWS(RDS), acontinuación se tiene una tabla con las habilidades, esta se puede alimentar desde el boton "Agregar Lenguaje"
                            y tambien se pueden visualizar los datos, editar y eliminar.
                        </p>
                    </div>
                    {/* Encabezado, buscador */}
                    <div className="d-flex mb-3">
                        <div className="col-md-10">
                            <div className="col-auto">
                                <label className="col-form-label">Buscar: </label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    onChange={e => table.setGlobalFilter(String(e.target.value))} />
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary" onClick={openAdd}>
                                    Agregar Lenguaje
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Tabla de datos */}
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id} onClick={header.column.getToggleSortingHandler} colSpan={header.colSpan} style={{ cursor: 'pointer' }}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {/* {header.column.getIsSorted() === 'asc' && ' ^'},
                                                {header.column.getIsSorted() === 'desc' && ' ^'} */}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>

                            <tbody>
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell, cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Paginado */}
                        <div className="d-flex" style={{ marginTop: 10 }}>
                            <div className="col-md-6">
                                <button className="btn btn-primary" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
                                    <ChevronsLeft size={20} />
                                </button>&nbsp;
                                <button className="btn btn-primary" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                    <ChevronLeft size={20} />
                                </button>

                                <span style={{ margin: '0  10px' }}>
                                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                                </span>

                                <button className="btn btn-primary" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                    <ChevronRight size={20} />
                                </button>&nbsp;
                                <button className="btn btn-primary" onClick={(() => table.lastPage())} disabled={!table.getCanNextPage()}>
                                    <ChevronsRight size={20} />
                                </button>&nbsp;
                                ({table.getRowCount()} Registros)
                            </div>
                            <div className="col-md-6 ">
                                <div className="d-flex justify-content-end">
                                    <label className="col-form-label mx-1">Mostrar</label>
                                    <select className="form-select form-control-sm custom-width" value={table.getState().pagination.pageSize}
                                        onChange={e => {
                                            table.setPageSize(Number(e.target.value))
                                        }}>
                                        {[5, 10, 20, 30, 40, 50].map(pageSize => (
                                            <option key={pageSize} value={pageSize}>{pageSize}</option>
                                        ))}
                                    </select>
                                    <label className="col-form-label mx-1">Registros</label>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex">
                            {/* Mostrando {table.getState().pagination.pageIndex} de {table.getState().pagination.pageSize} de un total de {table.getRowCount()} registros */}
                        </div>
                    </div>
                </div>
            )}
            {isOpen && (
                <FormLenguage
                    lenguage={dataEdit}
                    onCancel={onCancel}
                    handleAddEdit={handleAddEdit} />
            )}
        </>
    )
}

export default Excescises;