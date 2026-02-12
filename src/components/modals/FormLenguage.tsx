import React, { useState } from "react";
import type { Lenguage } from "../../types/Lenguage";
import { useForm, type SubmitHandler } from "react-hook-form";

interface ModalProps {
    lenguage: Lenguage | null
    onCancel: () => void,
    handleAddEdit: (lenguage: Lenguage) => void
}
const FormLenguage: React.FC<ModalProps> = ({ lenguage, onCancel, handleAddEdit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Lenguage>();
    const [form] = useState<Lenguage>({
        lenguaje_id: lenguage?.lenguaje_id ?? 0,
        categoria_id: lenguage?.categoria_id ?? 0,
        nombre: lenguage?.nombre ?? "",
        categoria: lenguage?.categoria ?? "",
        descripcion: lenguage?.descripcion ?? "",
        tiempo: lenguage?.tiempo ?? ""
    });

    const onsubmit: SubmitHandler<Lenguage> = (data) => {
        if (data) {
            handleAddEdit(data);
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className="text-center">Crear un lenguaje</h2>
                <form method="post" onSubmit={handleSubmit(onsubmit)}>
                    <div className="mb-3">
                        <input type="hidden" defaultValue={form.lenguaje_id}
                            {...register("lenguaje_id")} />
                        <label className="form-label">Nombre *</label>
                        <input
                            defaultValue={form.nombre}
                            {...register("nombre", { required: "El nombre es obligatorio" })}
                            className={`form-control ${errors.nombre ? 'border border-danger' : 'border border-success'}`}
                            placeholder="Nombre del lenguaje"
                        />
                        {errors.nombre && <span className="text-danger text-xs">{errors.nombre.message}</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Categoría *</label>
                        <select
                            defaultValue={form.categoria_id}
                            {...register("categoria_id", { required: "La categoria es requerida", })}
                            className={`form-control ${errors.categoria_id ? 'border border-danger' : 'border border-success'}`}
                        >
                            {/* <option value="0">Selecciona una opción</option> */}
                            <option value="1">Herramienta</option>
                            <option value="2">Lenguaje</option>
                            <option value="3">Framework</option>
                            <option value="4">Base de datos</option>
                        </select>
                        {errors.categoria_id && <span className="text-danger text-xs">{errors.categoria_id.message}</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción *</label>
                        <textarea
                            defaultValue={form.descripcion}
                            {...register("descripcion", { required: "La descripción es requerida" })}
                            className={`form-control ${errors.descripcion ? 'border border-danger' : 'border border-success'}`}
                            rows={4}
                            placeholder="Añade una descripcion del lenguaje"
                        >
                        </textarea>
                        {errors.descripcion && <span className="text-danger text-xs">{errors.descripcion.message}</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Años de uso *</label>
                        <input
                            type="number"
                            defaultValue={form.tiempo}
                            placeholder="5 Años"
                            {...register("tiempo", { required: "Los años son requeridos" })}
                            className={`form-control ${errors.descripcion ? 'border border-danger' : 'border border-success'}`}
                        />
                        {errors.tiempo && <span className="text-danger text-xs">{errors.tiempo.message}</span>}
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <button className="btn btn-outline-dark" onClick={onCancel}>Cancelar</button>
                        </div>
                        <div className="col-md-6 ">
                            <button type="submit" className="btn btn-dark btnSendMail">Enviar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormLenguage;