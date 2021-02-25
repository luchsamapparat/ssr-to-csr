package org.luchs.marvin.ssrtodo;

import org.ocpsoft.prettytime.PrettyTime;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.chrono.IsoChronology;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.FormatStyle;
import java.util.Locale;

public class DateUtils {

    public static LocalDate now() {
        return LocalDate.now();
    }

    public static String formatShortDate(LocalDate date, Locale locale) {
        return getDateFormatter(locale).format(date);
    }

    public static String formatShortDateTime(LocalDateTime date, Locale locale) {
        return getDateTimeFormatter(locale).format(date);
    }

    public static String formatIsoDate(LocalDate date) {
        return DateTimeFormatter.ISO_LOCAL_DATE.format(date);
    }

    public static String formatRelativeDate(LocalDateTime date, Locale locale) {
        PrettyTime prettyTime = new PrettyTime(locale);
        return prettyTime.format(date);
    }

    private static DateTimeFormatter getDateFormatter(Locale locale) {
        return getDateTimeFormatter(locale, null);
    }

    private static DateTimeFormatter getDateTimeFormatter(Locale locale) {
        return getDateTimeFormatter(locale, FormatStyle.SHORT);
    }

    private static DateTimeFormatter getDateTimeFormatter(Locale locale, FormatStyle timeStyle) {
        String pattern = addLeadingZeros(
            DateTimeFormatterBuilder
                .getLocalizedDateTimePattern(
                    FormatStyle.SHORT,
                    timeStyle,
                    IsoChronology.INSTANCE,
                    locale
                )
        );

        return DateTimeFormatter
            .ofPattern(pattern);
    }

    private static String addLeadingZeros(String pattern) {
        return pattern
            .replaceAll("d{1,2}", "dd")
            .replaceAll("M{1,2}", "MM");
    }
}
