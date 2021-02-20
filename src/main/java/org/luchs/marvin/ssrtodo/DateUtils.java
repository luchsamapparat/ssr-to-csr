package org.luchs.marvin.ssrtodo;

import org.ocpsoft.prettytime.PrettyTime;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class DateUtils {

    public static LocalDate now() {
        return LocalDate.now();
    }

    public static String formatShortDate(LocalDate date, Locale locale) {
        DateTimeFormatter dateFormatter = DateTimeFormatter
            .ofLocalizedDate(FormatStyle.SHORT)
            .withLocale(locale)
            .withZone(ZoneId.systemDefault());
        return dateFormatter.format(date);
    }

    public static String formatShortDateTime(LocalDateTime date, Locale locale) {
        DateTimeFormatter dateFormatter = DateTimeFormatter
            .ofLocalizedDateTime(FormatStyle.SHORT)
            .withLocale(locale)
            .withZone(ZoneId.systemDefault());
        return dateFormatter.format(date);
    }

    public static String formatIsoDate(LocalDate date) {
        return DateTimeFormatter.ISO_LOCAL_DATE.format(date);
    }

    public static String formatRelativeDate(LocalDateTime date, Locale locale) {
        PrettyTime prettyTime = new PrettyTime(locale);
        return prettyTime.format(date);
    }
}
