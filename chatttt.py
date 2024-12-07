import tkinter as tk
import subprocess

# Funciones para abrir programas de Python
def abrir_programa(ruta_programa):
    try:
        subprocess.Popen(["python", ruta_programa])  # Ejecuta el archivo .py en una nueva ventana
    except Exception as e:
        print(f"Error al abrir el programa: {e}")

# Función para mostrar la ventana con los nombres de los programas
def mostrar_programas(titulo):
    ventana = tk.Toplevel(root)
    ventana.title(titulo)
    
    tk.Label(ventana, text="Selecciona un programa para abrirlo:").pack(pady=10)
    
    # Lista de programas con sus rutas
    tk.Button(ventana, text="Programa 1", command=lambda: abrir_programa("programa1.py")).pack(pady=5)
    tk.Button(ventana, text="Programa 2", command=lambda: abrir_programa("programa2.py")).pack(pady=5)
    tk.Button(ventana, text="Programa 3", command=lambda: abrir_programa("programa3.py")).pack(pady=5)

# Ventana principal
root = tk.Tk()
root.title("Menú Principal")

# Botones del menú principal
for i in range(1, 6):
    tk.Button(root, text=f"Opción {i}", command=lambda i=i: mostrar_programas(f"Opción {i}")).pack(pady=5)

root.mainloop()
