Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead("D:\LOKRYD\LOKRYD_Website_Overall_Plan_Modern.docx")
$entry = $zip.GetEntry("word/document.xml")
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$content = $reader.ReadToEnd()
$stream.Close()
$zip.Dispose()

$matches = [regex]::Matches($content, "<w:t[^>]*>(.*?)</w:t>")
$allText = ($matches | ForEach-Object { $_.Groups[1].Value }) -join " "
Write-Output $allText
