<?php
// Приём заявок с формы сайта и отправка на почту компании.
// Настройка: укажите адрес получателя и адрес отправителя на домене сайта.
const MAIL_TO = 'info@str.org.ru';
const MAIL_FROM = 'site@rt-social.ru';

header('Content-Type: application/json; charset=utf-8');
$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function done(int $code, string $msg, bool $json): void {
  http_response_code($code);
  if ($json) { echo json_encode(['ok' => $code === 200, 'message' => $msg], JSON_UNESCAPED_UNICODE); }
  else { header('Content-Type: text/html; charset=utf-8'); echo '<!doctype html><meta charset="utf-8"><title>Заявка</title><p>' . htmlspecialchars($msg) . '</p><p><a href="/">На главную</a></p>'; }
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') done(405, 'Метод не поддерживается.', $wantsJson);
if (!empty($_POST['website'])) done(200, 'Заявка отправлена.', $wantsJson); // ловушка для ботов

$clean = fn($k, $max) => trim(mb_substr(strip_tags((string)($_POST[$k] ?? '')), 0, $max));
$name = $clean('name', 120);
$contact = $clean('contact', 160);
$message = $clean('message', 3000);
if ($name === '' || $contact === '' || empty($_POST['consent'])) done(422, 'Заполните имя, контакт и отметьте согласие.', $wantsJson);

$body = "Новая заявка с сайта rt-social.ru\n\nИмя: $name\nКонтакт: $contact\n\nРегион и задача:\n$message\n\nСогласие на обработку ПДн: да\nВремя: " . date('d.m.Y H:i') . "\nIP: " . ($_SERVER['REMOTE_ADDR'] ?? '');
$headers = [
  'From: =?UTF-8?B?' . base64_encode('Сайт РТ — Социальная сфера') . '?= <' . MAIL_FROM . '>',
  'Reply-To: ' . (filter_var($contact, FILTER_VALIDATE_EMAIL) ? $contact : MAIL_FROM),
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
];
$ok = mail(MAIL_TO, '=?UTF-8?B?' . base64_encode("Заявка с сайта: $name") . '?=', $body, implode("\r\n", $headers));
$ok ? done(200, 'Заявка отправлена.', $wantsJson) : done(500, 'Не удалось отправить заявку.', $wantsJson);
