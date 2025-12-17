export const Help = () => {
  const faqs = [
    { q: "How do I add a transaction?", a: "Go to Dashboard and click '+ Add expense' or '+ Add savings'" },
    { q: "Can I edit or delete transactions?", a: "Coming soon!" },
    { q: "Is my data secure?", a: "Yes! We use Supabase authentication and Row Level Security" },
    { q: "How do I change my income?", a: "Click 'Update income' on the Dashboard" },
    { q: "Can I export my data?", a: "Feature coming soon" },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Help & FAQ</h1>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">{faq.q}</h3>
            <p className="text-gray-700">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Still need help?</p>
        <button className="bg-violet-600 text-white px-8 py-3 rounded-lg hover:bg-violet-700">
          Contact Support
        </button>
      </div>
    </div>
  );
};