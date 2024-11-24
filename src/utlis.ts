/**
 * Генерирует случайную дату между двумя заданными датами.
 *
 * @param start - Начальная граница (объект Date).
 * @param end - Конечная граница (объект Date).
 * @returns Случайная дата между start и end.
 * @throws Ошибка, если начальная дата позже конечной.
 */
export function getRandomDate(start: Date, end: Date): Date {
    const startTimestamp = start.getTime();
    const endTimestamp = end.getTime();

    if (startTimestamp > endTimestamp) {
        throw new Error("Начальная дата должна быть меньше или равна конечной дате.");
    }

    // Генерируем случайное число между startTimestamp и endTimestamp
    const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);

    return new Date(randomTimestamp);
}

export interface DateRange {
    start: Date;
    end: Date;
}

export function generateNonOverlappingDateRanges(
    totalStart: Date,
    totalEnd: Date,
    count: number
): DateRange[] {
    if (count <= 0) {
        throw new Error("Количество периодов должно быть положительным числом.");
    }

    const startMs = totalStart.getTime();
    const endMs = totalEnd.getTime();

    if (startMs >= endMs) {
        throw new Error("Начальная дата должна быть меньше конечной даты.");
    }

    // Проверка на возможность создать требуемое количество периодов
    // В реальных условиях могут понадобиться дополнительные проверки на минимальную длительность периода
    if (2 * count > endMs - startMs) {
        throw new Error("Общий диапазон времени слишком мал для создания требуемого количества непересекающихся периодов.");
    }

    const timestamps = new Set<number>();

    // Функция для генерации уникальных случайных таймстемпов
    function getRandomTimestamp(): number {
        return startMs + Math.floor(Math.random() * (endMs - startMs));
    }

    // Генерация 2 * count уникальных таймстемпов
    while (timestamps.size < 2 * count) {
        timestamps.add(getRandomTimestamp());
    }

    // Преобразуем Set в массив и сортируем
    const sortedTimestamps = Array.from(timestamps).sort((a, b) => a - b);

    const dateRanges: DateRange[] = [];

    for (let i = 0; i < sortedTimestamps.length; i += 2) {
        const periodStart = sortedTimestamps[i];
        const periodEnd = sortedTimestamps[i + 1];

        // Дополнительная проверка, чтобы убедиться, что начало меньше конца
        if (periodStart >= periodEnd) {
            throw new Error("Ошибка при формировании периода: начало периода не может быть позже или равным его окончанию.");
        }

        dateRanges.push({
            start: new Date(periodStart),
            end: new Date(periodEnd),
        });

        if (dateRanges.length === count) {
            break;
        }
    }

    return dateRanges;
}