import sys

def read_pdf(file_path):
    try:
        import fitz
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text()
        print(text)
        return
    except ImportError:
        pass

    try:
        from PyPDF2 import PdfReader
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        print(text)
        return
    except ImportError:
        pass

    try:
        import pypdf
        reader = pypdf.PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        print(text)
        return
    except ImportError:
        pass

    print("ERROR: No suitable PDF library found. Please install PyPDF2, pypdf, or PyMuPDF (fitz).")
    sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        read_pdf(sys.argv[1])
    else:
        print("Usage: python read_cv.py <pdf_path>")
