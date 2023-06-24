import Layout from '../components/Layout';

export default function AboutPage() {
  return (
    <Layout title="Términos y condiciones">
      <section className="pt-24 md:mt-0 lg:px-48 md:px-12 px-4 bg-secondary font-pt-serif pb-20">
        <h1 className="text-5xl font-semibold mb-2">Términos y condiciones</h1>
        <div className="divide-y-2">
          <div className="my-2">
            <p className="text-xl font-bold">1. Introducción</p>
            <p>
              Estos términos y condiciones rigen el uso del servicio Grocerin y
              establecen las obligaciones y responsabilidades de los usuarios.
              Al acceder y utilizar nuestro servicio, el usuario acepta estos
              términos y condiciones.
            </p>
          </div>
          <div className="my-2">
            <p className="text-xl font-bold">
              2. Recopilación de datos personales
            </p>
            <p>
              Nos comprometemos a cumplir con las leyes y regulaciones
              aplicables a la protección de datos personales, incluyendo el
              Reglamento General de Protección de Datos (GDPR). Al utilizar
              nuestro servicio, el usuario acepta nuestra Política de Privacidad
              y reconoce que recopilamos, utilizamos y procesamos sus datos
              personales de acuerdo con esta política.
            </p>
            <p>
              Los datos del usuario recopilados y almacenados serán únicamente
              aquellos necesarios durante el registro para todos los usuarios,
              además de número de teléfono y ubicación para el caso de los
              usuarios que quieran convertirse en Productores. Estos datos son
              necesarios para evitar usos ilegales de la aplicación, como
              cuentas fraudulentas o spam, para poder ofrecer un servicio de
              calidad a los usuarios y una mayor seguridad a la comunidad.
            </p>
          </div>
          <div className="my-2">
            <p className="text-xl font-bold">3. Derecho al olvido</p>
            <p>
              Como usuario, en cualquier momento podrá eliminar su cuenta desde
              su perfil de usuario en la aplicación. Una vez eliminada la
              cuenta, todos los datos se anonimizarán y no se podrá rastrear al
              usuario en la aplicación ni en nuestra base de datos, excepto
              aquellos datos que por ley estemos obligados a conservar.
            </p>
          </div>
          <div className="my-2">
            <p className="text-xl font-bold">4. Derecho a obtener tus datos</p>
            <p>
              Como usuario, en cualquier momento podrá solicitar todos los datos
              que guardamos sobre usted en la aplicación. Para ello, envíe un
              correo solicitando sus datos a <b>app.grocerin@gmail.com</b>.
            </p>
          </div>
          <div className="my-2">
            <p className="text-xl font-bold">5. Responsabilidad</p>
            <p>
              Nos esforzamos por ofrecer un servicio seguro, confiable y de alta
              calidad. Todos los datos recopilados no saldrán en ningún momento
              de nuestro servicio, no se venderán a terceros ni se utilizarán
              para fines para los que no fueron concebidos.
            </p>
          </div>
          <div className="my-2">
            <p className="text-xl font-bold">6. Uso del sitio web/servicio</p>
            <p>
              El usuario acepta utilizar nuestro servicio de manera ética y
              legal, y se compromete a no utilizarlo con fines ilegales o no
              autorizados. No está permitido utilizar nuestro servicio para
              difundir contenidos ofensivos, violentos o discriminatorios, o
              para acosar o amenazar a otros usuarios.
            </p>
          </div>
          <div className="my-2">
            <p className="text-xl font-bold">7. Propiedad intelectual</p>
            <p>
              El usuario reconoce que todo el contenido del sitio web/servicio,
              incluyendo textos, gráficos, fotografías, diseños, logotipos,
              iconos, imágenes y software, está protegido por leyes de propiedad
              intelectual. El usuario se compromete a no copiar, reproducir,
              modificar, distribuir o explotar comercialmente el contenido del
              sitio web/servicio sin nuestra autorización previa y por escrito.
            </p>
          </div>
          <div>
            <p className="text-xl font-bold">
              8. Modificaciones y actualizaciones
            </p>
            <p>
              Cualquier modificación o actualización en los términos y
              condiciones será debidamente notificada a todos los usuarios, que
              podrán aceptar o rechazar estos nuevos cambios.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
