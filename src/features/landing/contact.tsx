import Button from "../../components/ui/button";
import Label from "../../components/ui/label";
import TextInput from "../../components/ui/text-input";
import TextAreaInput from "../../components/ui/textarea";

const Contact = () => {
  return (
    <section className="w-full bg-white px-4 py-16 font-sans lg:px-24">
      <div className="mx-auto grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Text & Form */}
        <div>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Get in Touch
          </h2>
          <p className="mb-8 text-gray-600">
            Have questions or want to learn more about our thrift collection?
            Send us a message and we’ll get back to you soon!
          </p>
          <form className="space-y-4">
            <div>
              <Label
                className="mb-1 block text-sm text-gray-700"
                htmlFor="name"
              >
                Name
              </Label>
              <TextInput
                id="name"
                type="text"
                placeholder="Your Name"
                className="w-full rounded-md border border-gray-300 px-4 py-2"
              />
            </div>
            <div>
              <Label
                className="mb-1 block text-sm text-gray-700"
                htmlFor="email"
              >
                Email
              </Label>
              <TextInput
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-md border border-gray-300 px-4 py-2"
              />
            </div>
            <div>
              <Label
                className="mb-1 block text-sm text-gray-700"
                htmlFor="message"
              >
                Message
              </Label>
              <TextAreaInput
                id="message"
                rows={4}
                placeholder="Write your message..."
                className="w-full rounded-md border border-gray-300 px-4 py-2"
              ></TextAreaInput>
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </div>

        <div className="h-full w-full">
          <iframe
            title="Google map"
            className="w-full overflow-hidden"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7030.949967099431!2d83.98790894999999!3d28.223259549999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995944f019fb07f%3A0x1cd9511d39c8dfc9!2sChipledhunga%2C%20Pokhara%2033700!5e0!3m2!1sen!2snp!4v1746695474520!5m2!1sen!2snp"
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
