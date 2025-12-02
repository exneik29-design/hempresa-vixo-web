import React, { useMemo, useState } from 'react';

const GanttChart = ({ tasks }) => {
    const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');

    // Obtener número de semana
    const getWeekNumber = (date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    // Generar períodos (días, semanas o meses)
    const generatePeriods = (start, end, mode) => {
        const periods = [];
        let current = new Date(start);

        if (mode === 'day') {
            while (current <= end) {
                periods.push({
                    label: current.getDate(),
                    fullLabel: current.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
                    date: new Date(current)
                });
                current.setDate(current.getDate() + 1);
            }
        } else if (mode === 'week') {
            // Agrupar por semanas
            while (current <= end) {
                const weekStart = new Date(current);
                const weekEnd = new Date(current);
                weekEnd.setDate(weekEnd.getDate() + 6);

                periods.push({
                    label: `S${getWeekNumber(weekStart)}`,
                    fullLabel: `${weekStart.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })} - ${weekEnd.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}`,
                    date: new Date(current),
                    weekStart: weekStart,
                    weekEnd: weekEnd
                });
                current.setDate(current.getDate() + 7);
            }
        } else if (mode === 'month') {
            while (current <= end) {
                periods.push({
                    label: current.toLocaleDateString('es-ES', { month: 'short' }),
                    fullLabel: current.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
                    date: new Date(current)
                });
                current.setMonth(current.getMonth() + 1);
            }
        }

        return periods;
    };

    // Calcular rango de fechas del proyecto
    const dateRange = useMemo(() => {
        // Filtrar tareas válidas primero
        const validTasks = (tasks || []).filter(t =>
            t.startDate && t.endDate &&
            !isNaN(new Date(t.startDate).getTime()) &&
            !isNaN(new Date(t.endDate).getTime())
        );

        if (validTasks.length === 0) {
            const now = new Date();
            const end = new Date();
            end.setDate(end.getDate() + 7);
            return { start: now, end: end, periods: generatePeriods(now, end, viewMode) };
        }

        const dates = validTasks.flatMap(t => [new Date(t.startDate), new Date(t.endDate)]);
        let minDate = new Date(Math.min(...dates));
        let maxDate = new Date(Math.max(...dates));

        // Validar que las fechas sean válidas (por seguridad extra)
        if (isNaN(minDate.getTime()) || isNaN(maxDate.getTime())) {
            const now = new Date();
            return { start: now, end: now, periods: [] };
        }

        // Aplicar filtros si existen
        if (filterStartDate) {
            const filterStart = new Date(filterStartDate);
            if (!isNaN(filterStart.getTime()) && filterStart > minDate) minDate = filterStart;
        }
        if (filterEndDate) {
            const filterEnd = new Date(filterEndDate);
            if (!isNaN(filterEnd.getTime()) && filterEnd < maxDate) maxDate = filterEnd;
        }

        // Ajustar al inicio del período
        minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());

        // Generar períodos según el modo de vista
        const periods = generatePeriods(minDate, maxDate, viewMode);

        return { start: minDate, end: maxDate, periods };
    }, [tasks, viewMode, filterStartDate, filterEndDate]);

    // Calcular posición y ancho de cada barra
    const getTaskBar = (task) => {
        const start = new Date(task.startDate);
        const end = new Date(task.endDate);

        // Si la tarea está fuera del rango filtrado, no mostrarla
        if (start > dateRange.end || end < dateRange.start) {
            return { display: 'none' };
        }

        const totalDays = (dateRange.end - dateRange.start) / (1000 * 60 * 60 * 24);
        const taskStart = Math.max(0, (start - dateRange.start) / (1000 * 60 * 60 * 24));
        const taskEnd = Math.min(totalDays, (end - dateRange.start) / (1000 * 60 * 60 * 24));
        const taskDuration = taskEnd - taskStart;

        return {
            left: `${(taskStart / totalDays) * 100}%`,
            width: `${(taskDuration / totalDays) * 100}%`
        };
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completado': return '#22c55e';
            case 'En Progreso': return '#3b82f6';
            case 'Pendiente': return '#94a3b8';
            default: return '#64748b';
        }
    };

    // Filtrar tareas visibles
    const visibleTasks = useMemo(() => {
        if (!tasks) return [];
        return tasks.filter(task => {
            if (!task.startDate || !task.endDate) return false;
            const start = new Date(task.startDate);
            const end = new Date(task.endDate);
            if (isNaN(start.getTime()) || isNaN(end.getTime())) return false;

            return !(start > dateRange.end || end < dateRange.start);
        });
    }, [tasks, dateRange]);

    if (!tasks || tasks.length === 0) {
        return (
            <div style={styles.emptyState}>
                <i className="fa-solid fa-calendar-days" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem' }}></i>
                <p>No hay tareas para mostrar en el cronograma</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* CONTROLES */}
            <div style={styles.controls}>
                <div style={styles.controlGroup}>
                    <label style={styles.controlLabel}>Vista:</label>
                    <div style={styles.viewModeButtons}>
                        <button
                            style={viewMode === 'day' ? styles.viewButtonActive : styles.viewButton}
                            onClick={() => setViewMode('day')}
                        >
                            <i className="fa-solid fa-calendar-day"></i> Día
                        </button>
                        <button
                            style={viewMode === 'week' ? styles.viewButtonActive : styles.viewButton}
                            onClick={() => setViewMode('week')}
                        >
                            <i className="fa-solid fa-calendar-week"></i> Semana
                        </button>
                        <button
                            style={viewMode === 'month' ? styles.viewButtonActive : styles.viewButton}
                            onClick={() => setViewMode('month')}
                        >
                            <i className="fa-solid fa-calendar"></i> Mes
                        </button>
                    </div>
                </div>

                <div style={styles.controlGroup}>
                    <label style={styles.controlLabel}>Filtrar por fecha:</label>
                    <div style={styles.dateFilters}>
                        <input
                            type="date"
                            style={styles.dateInput}
                            value={filterStartDate}
                            onChange={(e) => setFilterStartDate(e.target.value)}
                            placeholder="Desde"
                        />
                        <span style={{ color: '#64748b' }}>hasta</span>
                        <input
                            type="date"
                            style={styles.dateInput}
                            value={filterEndDate}
                            onChange={(e) => setFilterEndDate(e.target.value)}
                            placeholder="Hasta"
                        />
                        {(filterStartDate || filterEndDate) && (
                            <button
                                style={styles.clearButton}
                                onClick={() => {
                                    setFilterStartDate('');
                                    setFilterEndDate('');
                                }}
                            >
                                <i className="fa-solid fa-xmark"></i> Limpiar
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* GANTT CHART */}
            <div style={styles.ganttWrapper}>
                {/* HEADER CON PERÍODOS */}
                <div style={styles.header}>
                    <div style={styles.taskLabelsHeader}>
                        <div>Tarea</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                            {visibleTasks.length} tarea{visibleTasks.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                    <div style={styles.timelineHeader}>
                        {dateRange.periods.map((period, idx) => (
                            <div
                                key={idx}
                                style={styles.periodLabel}
                                title={period.fullLabel}
                            >
                                <div style={styles.periodLabelText}>{period.label}</div>
                                {viewMode === 'week' && (
                                    <div style={styles.periodSubLabel}>
                                        {period.weekStart.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* TAREAS */}
                <div style={styles.tasksContainer}>
                    {visibleTasks.length === 0 ? (
                        <div style={styles.emptyState}>
                            <p>No hay tareas en el rango de fechas seleccionado</p>
                        </div>
                    ) : (
                        visibleTasks.map(task => {
                            const barStyle = getTaskBar(task);
                            if (barStyle.display === 'none') return null;

                            return (
                                <div key={task.id} style={styles.taskRow}>
                                    {/* LABEL DE TAREA */}
                                    <div style={styles.taskLabel}>
                                        <div style={styles.taskTitle}>{task.title}</div>

                                        {/* Badges */}
                                        <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.375rem', flexWrap: 'wrap' }}>
                                            {task.phase && (
                                                <span style={styles.phaseBadge}>
                                                    <i className="fa-solid fa-layer-group" style={{ fontSize: '0.65rem' }}></i>
                                                    {' '}{task.phase}
                                                </span>
                                            )}
                                            {task.floor && (
                                                <span style={styles.floorBadge}>
                                                    <i className="fa-solid fa-building" style={{ fontSize: '0.65rem' }}></i>
                                                    {' '}{task.floor}
                                                </span>
                                            )}
                                        </div>

                                        <div style={styles.taskDates}>
                                            <i className="fa-solid fa-calendar-day" style={{ fontSize: '0.7rem' }}></i>
                                            {' '}
                                            {new Date(task.startDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                                            {' → '}
                                            {new Date(task.endDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                                            {task.workDays && (
                                                <span style={{ marginLeft: '0.5rem', color: '#94a3b8' }}>
                                                    ({task.workDays}d)
                                                </span>
                                            )}
                                        </div>

                                        {task.milestone && (
                                            <div style={{ fontSize: '0.7rem', color: '#92400e', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <i className="fa-solid fa-flag" style={{ fontSize: '0.65rem' }}></i>
                                                {task.milestone}
                                            </div>
                                        )}

                                        {task.description && (
                                            <div style={styles.taskDescription}>{task.description}</div>
                                        )}

                                        <span style={{
                                            ...styles.statusBadge,
                                            backgroundColor: getStatusColor(task.status) + '20',
                                            color: getStatusColor(task.status)
                                        }}>
                                            {task.status}
                                        </span>
                                    </div>

                                    {/* TIMELINE CON GRID */}
                                    <div style={styles.timeline}>
                                        {/* Grid vertical */}
                                        {dateRange.periods.map((_, idx) => (
                                            <div
                                                key={idx}
                                                style={{
                                                    ...styles.gridLine,
                                                    left: `${(idx / dateRange.periods.length) * 100}%`
                                                }}
                                            />
                                        ))}

                                        {/* Barra de tarea */}
                                        <div
                                            style={{
                                                ...styles.taskBar,
                                                left: barStyle.left,
                                                width: barStyle.width,
                                                backgroundColor: getStatusColor(task.status)
                                            }}
                                            title={`${task.title}: ${task.startDate} - ${task.endDate}`}
                                        >
                                            <span style={styles.barLabel}>{task.title}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* LEYENDA */}
            <div style={styles.legend}>
                <div style={styles.legendItem}>
                    <div style={{ ...styles.legendColor, backgroundColor: '#22c55e' }}></div>
                    <span>Completado</span>
                </div>
                <div style={styles.legendItem}>
                    <div style={{ ...styles.legendColor, backgroundColor: '#3b82f6' }}></div>
                    <span>En Progreso</span>
                </div>
                <div style={styles.legendItem}>
                    <div style={{ ...styles.legendColor, backgroundColor: '#94a3b8' }}></div>
                    <span>Pendiente</span>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0'
    },
    controls: {
        padding: '1.5rem',
        borderBottom: '2px solid #e2e8f0',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        alignItems: 'center',
        backgroundColor: '#f8fafc'
    },
    controlGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap'
    },
    controlLabel: {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#475569'
    },
    viewModeButtons: {
        display: 'flex',
        gap: '0.5rem',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        overflow: 'hidden'
    },
    viewButton: {
        padding: '0.5rem 1rem',
        border: 'none',
        background: 'white',
        cursor: 'pointer',
        fontSize: '0.875rem',
        color: '#64748b',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem'
    },
    viewButtonActive: {
        padding: '0.5rem 1rem',
        border: 'none',
        background: '#0f172a',
        color: 'white',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem'
    },
    dateFilters: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    dateInput: {
        padding: '0.5rem',
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        fontSize: '0.875rem'
    },
    clearButton: {
        padding: '0.5rem 0.75rem',
        border: '1px solid #e2e8f0',
        background: 'white',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        transition: 'all 0.2s'
    },
    ganttWrapper: {
        overflowX: 'auto'
    },
    header: {
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        borderBottom: '2px solid #e2e8f0',
        backgroundColor: '#f8fafc',
        position: 'sticky',
        top: 0,
        zIndex: 10
    },
    taskLabelsHeader: {
        padding: '1rem',
        fontWeight: 'bold',
        borderRight: '2px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column'
    },
    timelineHeader: {
        display: 'flex',
        minWidth: '800px'
    },
    periodLabel: {
        flex: 1,
        textAlign: 'center',
        padding: '0.5rem',
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#64748b',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
    },
    periodLabelText: {
        fontSize: '0.875rem',
        fontWeight: '700',
        color: '#1e293b'
    },
    periodSubLabel: {
        fontSize: '0.7rem',
        color: '#94a3b8'
    },
    tasksContainer: {
        maxHeight: '600px',
        overflowY: 'auto'
    },
    taskRow: {
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        borderBottom: '1px solid #e2e8f0',
        minHeight: '80px'
    },
    taskLabel: {
        padding: '1rem',
        borderRight: '2px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        backgroundColor: 'white'
    },
    taskTitle: {
        fontWeight: '600',
        color: '#0f172a',
        fontSize: '0.95rem'
    },
    taskDates: {
        fontSize: '0.75rem',
        color: '#64748b',
        marginTop: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
    },
    taskDescription: {
        fontSize: '0.8rem',
        color: '#64748b',
        marginTop: '0.25rem',
        lineHeight: '1.4',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
    },
    statusBadge: {
        display: 'inline-block',
        padding: '0.25rem 0.5rem',
        borderRadius: '12px',
        fontSize: '0.7rem',
        fontWeight: '600',
        marginTop: '0.5rem',
        width: 'fit-content'
    },
    phaseBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.2rem 0.5rem',
        borderRadius: '10px',
        fontSize: '0.7rem',
        fontWeight: '600',
        backgroundColor: '#dbeafe',
        color: '#1e40af'
    },
    floorBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.2rem 0.5rem',
        borderRadius: '10px',
        fontSize: '0.7rem',
        fontWeight: '600',
        backgroundColor: '#e0e7ff',
        color: '#4338ca'
    },
    timeline: {
        position: 'relative',
        padding: '1rem 0',
        backgroundColor: '#fafafa',
        minWidth: '800px'
    },
    gridLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '1px',
        backgroundColor: '#e2e8f0',
        zIndex: 1
    },
    taskBar: {
        position: 'absolute',
        height: '32px',
        borderRadius: '4px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 0.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.2s',
        cursor: 'pointer',
        zIndex: 2,
        minWidth: '40px'
    },
    barLabel: {
        color: 'white',
        fontSize: '0.75rem',
        fontWeight: '600',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    legend: {
        display: 'flex',
        gap: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        justifyContent: 'center'
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.85rem'
    },
    legendColor: {
        width: '16px',
        height: '16px',
        borderRadius: '3px'
    },
    emptyState: {
        padding: '3rem',
        textAlign: 'center',
        color: '#64748b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

export default GanttChart;
