interface Props {
    elementosPorPagina: number;
    totalElementos: number;
    cambiarPagina: (numPagina: number) => void;
    paginaActual: number;
}
const Pagination = ({ elementosPorPagina, totalElementos, cambiarPagina, paginaActual }: Props) => {
    const totalPaginas = Math.ceil(totalElementos / elementosPorPagina);
    return (
        <nav>
            <ul className="pagination">
                <li className={`mx-1 page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => cambiarPagina(paginaActual - 1)}>
                        Anterior
                    </button>
                </li>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(numeroPagina => (
                    <li key={numeroPagina} className={`mx-1 page-item ${paginaActual === numeroPagina ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => cambiarPagina(numeroPagina)}>
                            {numeroPagina}
                        </button>
                    </li>
                ))}
                <li className={`mx-1 page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => cambiarPagina(paginaActual + 1)}>
                        Siguiente
                    </button>
                </li>
                <select className="form-select form-control-sm custom-width">
                    <option value="0">1 -10</option>
                    <option value="1">10 - 20</option>
                </select>
            </ul>
        </nav>
    )
}

export default Pagination;